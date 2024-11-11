## ER Diagram

```mermaid
erDiagram
    USER {
        string user_id PK
        string name
        string email
        string phone
        string password
        timestamp created_at
    }
    
    TRAIN {
        string train_id PK
        string name
        decimal price
        int available_seats
        timestamp departure_time
        timestamp arrival_time
    }
    
    STATION {
        string station_id PK
        string name
        string city
        string state
    }
    
    ROUTE {
        string route_id PK
        string train_id FK
        string from_station FK
        string to_station FK
        int sequence
        time departure_time
        time arrival_time
    }
    
    BOOKING {
        string booking_id PK
        string user_id FK
        string train_id FK
        string route_id FK
        decimal total_amount
        string status
        timestamp booking_date
    }
    
    PASSENGER {
        string passenger_id PK
        string booking_id FK
        string name
        int age
        string seat_number
    }
    
    PAYMENT {
        string payment_id PK
        string booking_id FK
        decimal amount
        string status
        string payment_method
        timestamp payment_date
    }

    USER ||--o{ BOOKING : makes
    TRAIN ||--o{ BOOKING : has
    BOOKING ||--|{ PASSENGER : includes
    BOOKING ||--|| PAYMENT : has
    TRAIN ||--|{ ROUTE : follows
    STATION ||--o{ ROUTE : from
    STATION ||--o{ ROUTE : to
```

## Relational Schema (3NF)

### 1. users
- user_id (PK)
- name
- email (unique)
- phone
- password
- created_at

### 2. stations
- station_id (PK)
- name
- city
- state

### 3. trains
- train_id (PK)
- name
- price
- available_seats
- created_at

### 4. routes
- route_id (PK)
- train_id (FK)
- from_station_id (FK)
- to_station_id (FK)
- sequence
- departure_time
- arrival_time

### 5. bookings
- booking_id (PK)
- user_id (FK)
- train_id (FK)
- route_id (FK)
- total_amount
- status
- booking_date

### 6. passengers
- passenger_id (PK)
- booking_id (FK)
- name
- age
- seat_number

### 7. payments
- payment_id (PK)
- booking_id (FK)
- amount
- status
- payment_method
- payment_date

## Normalization Analysis

### First Normal Form (1NF)
- All tables have a primary key
- All columns contain atomic values
- No repeating groups

### Second Normal Form (2NF)
- Meets 1NF requirements
- All non-key attributes are fully functionally dependent on the primary key
- No partial dependencies

### Third Normal Form (3NF)
- Meets 2NF requirements
- No transitive dependencies
- Each non-key attribute depends only on the primary key

### Key Design Decisions

1. **Separation of Routes and Trains**
   - Routes are separated from trains to allow multiple routes per train
   - Enables flexible scheduling and route management

2. **Independent Passenger Records**
   - Passengers are stored separately from bookings
   - Allows multiple passengers per booking
   - Maintains passenger history

3. **Payment Separation**
   - Payment information is stored separately for security
   - Enables multiple payment attempts if needed
   - Maintains payment history

4. **Station Management**
   - Stations are managed independently
   - Enables route optimization
   - Facilitates station-specific operations

### Constraints

1. **Referential Integrity**
   - All foreign keys must reference existing records
   - Cascade delete disabled for safety
   - Soft deletes recommended for historical data

2. **Business Rules**
   - Booking status must be one of: 'pending', 'confirmed', 'cancelled'
   - Payment status must be one of: 'pending', 'completed', 'failed'
   - Available seats must be >= 0
   - Total amount must be > 0

3. **Unique Constraints**
   - User email must be unique
   - Train name must be unique
   - Station name + city must be unique