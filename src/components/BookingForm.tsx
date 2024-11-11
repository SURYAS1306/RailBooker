import React, { useState } from 'react';
import { Train, Passenger } from '../types';

interface BookingFormProps {
  train: Train;
  onSubmit: (passengers: Passenger[]) => void;
  onCancel: () => void;
}

export default function BookingForm({ train, onSubmit, onCancel }: BookingFormProps) {
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: '', age: 0, seatNumber: '' },
  ]);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', age: 0, seatNumber: '' }]);
  };

  const handleRemovePassenger = (index: number) => {
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const handlePassengerChange = (
    index: number,
    field: keyof Passenger,
    value: string | number
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(passengers);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Passenger Details</h2>
      <div className="mb-4">
        <p className="text-gray-600">
          Train: {train.name} ({train.from} to {train.to})
        </p>
        <p className="text-gray-600">
          Departure: {train.departureTime} | Arrival: {train.arrivalTime}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Passenger {index + 1}</h3>
              {passengers.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePassenger(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) =>
                    handlePassengerChange(index, 'name', e.target.value)
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={passenger.age || ''}
                  onChange={(e) =>
                    handlePassengerChange(index, 'age', parseInt(e.target.value))
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                  min="0"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seat Preference
                </label>
                <select
                  value={passenger.seatNumber}
                  onChange={(e) =>
                    handlePassengerChange(index, 'seatNumber', e.target.value)
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select seat</option>
                  <option value="window">Window</option>
                  <option value="aisle">Aisle</option>
                  <option value="middle">Middle</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={handleAddPassenger}
            className="text-indigo-600 hover:text-indigo-800"
          >
            + Add Another Passenger
          </button>

          <div className="space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}