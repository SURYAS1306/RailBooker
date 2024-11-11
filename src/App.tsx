import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import TrainList from './components/TrainList';
import BookingForm from './components/BookingForm';
import PaymentForm from './components/PaymentForm';
import BookingConfirmation from './components/BookingConfirmation';
import MyBookings from './components/MyBookings';
import { Train, Booking, Passenger } from './types';
import { trains } from './data/mockData';

export default function App() {
  const [searchResults, setSearchResults] = useState<Train[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentStep, setCurrentStep] = useState<'search' | 'book' | 'payment' | 'confirmation'>('search');
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [showMyBookings, setShowMyBookings] = useState(false);

  const handleSearch = (from: string, to: string, date: string) => {
    // Simulate API call
    const results = trains.filter(
      (train) => train.from === from && train.to === to
    );
    setSearchResults(results);
    setShowMyBookings(false);
  };

  const handleTrainSelect = (train: Train) => {
    setSelectedTrain(train);
    setCurrentStep('book');
  };

  const handlePassengerSubmit = (passengers: Passenger[]) => {
    if (selectedTrain) {
      const totalPrice = selectedTrain.price * passengers.length;
      setCurrentBooking({
        id: `BK${Math.random().toString(36).substr(2, 9)}`,
        trainId: selectedTrain.id,
        passengers,
        totalPrice,
        bookingDate: new Date().toISOString(),
        status: 'pending',
      });
      setCurrentStep('payment');
    }
  };

  const handlePaymentSubmit = (paymentDetails: any) => {
    if (currentBooking) {
      const confirmedBooking = {
        ...currentBooking,
        status: 'confirmed' as const,
      };
      setBookings([...bookings, confirmedBooking]);
      setCurrentBooking(confirmedBooking);
      setCurrentStep('confirmation');
    }
  };

  const handleBookingDone = () => {
    setCurrentStep('search');
    setSelectedTrain(null);
    setCurrentBooking(null);
    setSearchResults([]);
  };

  const toggleMyBookings = () => {
    setShowMyBookings(!showMyBookings);
    setSearchResults([]);
    setCurrentStep('search');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={toggleMyBookings}
            className="text-indigo-600 hover:text-indigo-800"
          >
            {showMyBookings ? '← Back to Search' : 'View My Bookings'}
          </button>
        </div>

        {showMyBookings ? (
          <MyBookings bookings={bookings} />
        ) : (
          <>
            {currentStep === 'search' && (
              <div className="space-y-6">
                <SearchForm onSearch={handleSearch} />
                {searchResults.length > 0 && (
                  <TrainList trains={searchResults} onSelect={handleTrainSelect} />
                )}
              </div>
            )}

            {currentStep === 'book' && selectedTrain && (
              <BookingForm
                train={selectedTrain}
                onSubmit={handlePassengerSubmit}
                onCancel={() => setCurrentStep('search')}
              />
            )}

            {currentStep === 'payment' && currentBooking && (
              <PaymentForm
                amount={currentBooking.totalPrice}
                onSubmit={handlePaymentSubmit}
                onCancel={() => setCurrentStep('book')}
              />
            )}

            {currentStep === 'confirmation' && currentBooking && (
              <BookingConfirmation
                booking={currentBooking}
                onClose={handleBookingDone}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}