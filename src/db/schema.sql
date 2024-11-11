-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE payment_method AS ENUM ('credit_card', 'debit_card', 'upi', 'net_banking');

-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Stations table
CREATE TABLE stations (
    station_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    UNIQUE (name, city)
);

-- Trains table
CREATE TABLE trains (
    train_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    available_seats INTEGER NOT NULL CHECK (available_seats >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Routes table
CREATE TABLE routes (
    route_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    train_id UUID NOT NULL REFERENCES trains(train_id),
    from_station_id UUID NOT NULL REFERENCES stations(station_id),
    to_station_id UUID NOT NULL REFERENCES stations(station_id),
    sequence INTEGER NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    CHECK (from_station_id != to_station_id),
    CHECK (arrival_time > departure_time),
    UNIQUE (train_id, sequence)
);

-- Bookings table
CREATE TABLE bookings (
    booking_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    train_id UUID NOT NULL REFERENCES trains(train_id),
    route_id UUID NOT NULL REFERENCES routes(route_id),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount > 0),
    status booking_status NOT NULL DEFAULT 'pending',
    booking_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Passengers table
CREATE TABLE passengers (
    passenger_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(booking_id),
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 120),
    seat_number VARCHAR(10) NOT NULL,
    UNIQUE (booking_id, seat_number)
);

-- Payments table
CREATE TABLE payments (
    payment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(booking_id),
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    status payment_status NOT NULL DEFAULT 'pending',
    payment_method payment_method NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_train_id ON bookings(train_id);
CREATE INDEX idx_routes_train_id ON routes(train_id);
CREATE INDEX idx_passengers_booking_id ON passengers(booking_id);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);

-- Function to update available seats
CREATE OR REPLACE FUNCTION update_available_seats()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'confirmed' THEN
        UPDATE trains
        SET available_seats = available_seats - (
            SELECT COUNT(*) FROM passengers WHERE booking_id = NEW.booking_id
        )
        WHERE train_id = NEW.train_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating seats
CREATE TRIGGER booking_confirmation_trigger
    AFTER UPDATE OF status ON bookings
    FOR EACH ROW
    WHEN (OLD.status = 'pending' AND NEW.status = 'confirmed')
    EXECUTE FUNCTION update_available_seats();