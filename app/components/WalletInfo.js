'use client'

import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function WalletInfo({ address, balance }) {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Wallet Information</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Address</p>
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm break-all">{address}</p>
            <button
              onClick={copyAddress}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Balance</p>
          <p className="text-2xl font-semibold">{Number(balance).toFixed(4)} ETH</p>
        </div>
      </div>
    </div>
  );
}