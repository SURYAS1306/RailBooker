import React from 'react';
import { Check, Download } from 'lucide-react';
import { Booking } from '../types';

interface BookingConfirmationProps {
  booking: Booking;
  onClose: () => void;
}

export default function BookingConfirmation({ booking, onClose }: BookingConfirmationProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h2>
        <p className="text-gray-600 mt-2">Booking ID: {booking.id}</p>
      </div>

      <div className="border-t border-b border-gray-200 py-4 my-4">
        <div className="space-y-3">
          <p className="text-gray-600">
            <span className="font-medium">Date:</span> {booking.bookingDate}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Total Amount:</span> ₹{booking.totalPrice.toFixed(2)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Number of Passengers:</span>{' '}
            {booking.passengers.length}
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <button
          className="w-full flex items-center justify-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Ticket
        </button>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Done
        </button>
      </div>
    </div>
  );
}