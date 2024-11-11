import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
}

export default function MyBookings({ bookings }: MyBookingsProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">Booking #{booking.id}</h3>
              <p className="text-sm text-gray-500">{booking.bookingDate}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              booking.status === 'confirmed'
                ? 'bg-green-100 text-green-800'
                : booking.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Passengers</p>
                <ul className="mt-1">
                  {booking.passengers.map((passenger, index) => (
                    <li key={index} className="text-sm">
                      {passenger.name} - Seat {passenger.seatNumber}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-semibold">₹{booking.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}