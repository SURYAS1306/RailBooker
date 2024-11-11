import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { cities } from '../data/mockData';

interface SearchFormProps {
  onSearch: (from: string, to: string, date: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(from, to, date);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="pl-10 w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select departure city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="pl-10 w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select destination city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Search Trains
      </button>
    </form>
  );
}