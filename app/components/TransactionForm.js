'use client'

import { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function TransactionForm({ signer, onSuccess }) {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!ethers.isAddress(to)) {
        throw new Error('Invalid recipient address');
      }

      const tx = await signer.sendTransaction({
        to: to,
        value: ethers.parseEther(amount)
      });

      toast.promise(tx.wait(), {
        loading: 'Transaction is pending...',
        success: 'Transaction confirmed!',
        error: 'Transaction failed'
      });

      await tx.wait();
      setTo('');
      setAmount('');
      onSuccess();
    } catch (error) {
      console.error('Transaction error:', error);
      toast.error(error.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Send ETH</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address
          </label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="0x..."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (ETH)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="0.0"
              required
            />
            <span className="absolute right-3 top-2 text-gray-500">ETH</span>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {loading ? (
            'Sending...'
          ) : (
            <>
              <span>Send</span>
              <ArrowRightIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}