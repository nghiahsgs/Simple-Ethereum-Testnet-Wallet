'use client'

import { useEffect, useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

export default function TransactionHistory({ provider, address }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!provider || !address) return;
      
      try {
        // Get the last 10 blocks
        const currentBlock = await provider.getBlockNumber();
        const blocks = await Promise.all(
          Array.from({ length: 10 }, (_, i) => 
            provider.getBlock(currentBlock - i, true)
          )
        );

        // Filter transactions involving our address
        const relevantTxs = blocks
          .flatMap(block => block?.transactions || [])
          .filter(tx => 
            tx.from?.toLowerCase() === address.toLowerCase() || 
            tx.to?.toLowerCase() === address.toLowerCase()
          )
          .map(tx => ({
            ...tx,
            type: tx.from.toLowerCase() === address.toLowerCase() ? 'sent' : 'received'
          }));

        setTransactions(relevantTxs);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [provider, address]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No transactions found</p>
        ) : (
          transactions.map((tx, index) => (
            <div
              key={tx.hash}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  tx.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  {tx.type === 'sent' ? (
                    <ArrowUpIcon className="w-4 h-4 text-red-600" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {tx.type === 'sent' ? 'Sent to' : 'Received from'}
                  </p>
                  <p className="text-xs text-gray-500 font-mono">
                    {tx.type === 'sent' ? tx.to : tx.from}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  tx.type === 'sent' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {tx.type === 'sent' ? '-' : '+'}{Number(tx.value) / 1e18} ETH
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}