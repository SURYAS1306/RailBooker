import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, IndianRupee } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSubmit: (paymentDetails: any) => void;
  onCancel: () => void;
}

export default function PaymentForm({ amount, onSubmit, onCancel }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cardNumber,
      expiryDate,
      cvv,
      name,
      amount,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      <div className="mb-4">
        <p className="text-xl font-medium text-indigo-600">
          Total Amount: ₹{amount.toFixed(2)}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Holder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                className="pl-10 w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="1234 5678 9012 3456"
                required
                pattern="\d{16}"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="pl-10 w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  placeholder="MM/YY"
                  required
                  pattern="\d{2}/\d{2}"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className="pl-10 w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                  placeholder="123"
                  required
                  pattern="\d{3}"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
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
            Pay ₹{amount.toFixed(2)}
          </button>
        </div>
      </form>
    </div>
  );
}