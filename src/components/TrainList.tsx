import React from 'react';
import { Clock, IndianRupee } from 'lucide-react';
import { Train } from '../types';

interface TrainListProps {
  trains: Train[];
  onSelect: (train: Train) => void;
}

export default function TrainList({ trains, onSelect }: TrainListProps) {
  if (trains.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No trains found for the selected route.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trains.map((train) => (
        <div
          key={train.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="grid md:grid-cols-4 gap-4 items-center">
            <div>
              <h3 className="font-semibold text-lg">{train.name}</h3>
              <p className="text-sm text-gray-500">Train #{train.id}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Clock size={20} className="text-gray-400" />
              <div>
                <p className="font-medium">{train.departureTime}</p>
                <p className="text-sm text-gray-500">{train.from}</p>
              </div>
              <div className="border-t-2 border-gray-300 w-12 mx-2"></div>
              <div>
                <p className="font-medium">{train.arrivalTime}</p>
                <p className="text-sm text-gray-500">{train.to}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <IndianRupee size={20} className="text-gray-400" />
              <div>
                <p className="font-medium">₹{train.price}</p>
                <p className="text-sm text-gray-500">
                  {train.availableSeats} seats left
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelect(train)}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Select
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}