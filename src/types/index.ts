export interface Train {
  id: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

export interface Passenger {
  name: string;
  age: number;
  seatNumber: string;
}

export interface Booking {
  id: string;
  trainId: string;
  passengers: Passenger[];
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}