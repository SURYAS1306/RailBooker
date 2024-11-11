import { Train } from '../types';

export const trains: Train[] = [
  {
    id: 'TR001',
    name: 'Rajdhani Express',
    from: 'Mumbai',
    to: 'Delhi',
    departureTime: '16:00',
    arrivalTime: '08:35',
    price: 2499,
    availableSeats: 45,
  },
  {
    id: 'TR002',
    name: 'Shatabdi Express',
    from: 'Bangalore',
    to: 'Chennai',
    departureTime: '06:00',
    arrivalTime: '11:00',
    price: 1299,
    availableSeats: 32,
  },
  {
    id: 'TR003',
    name: 'Duronto Express',
    from: 'Delhi',
    to: 'Kolkata',
    departureTime: '20:00',
    arrivalTime: '11:30',
    price: 2899,
    availableSeats: 28,
  },
];

export const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
];