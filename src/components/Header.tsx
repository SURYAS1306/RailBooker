import React from 'react';
import { Train } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Train size={32} />
            <h1 className="text-2xl font-bold">RailBooker</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#search" className="hover:text-indigo-200 transition-colors">
              Search Tickets
            </a>
            <a href="#bookings" className="hover:text-indigo-200 transition-colors">
              My Bookings
            </a>
            <a href="#contact" className="hover:text-indigo-200 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}