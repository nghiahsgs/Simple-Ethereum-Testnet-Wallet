'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import WalletConnect from './components/WalletConnect';
import WalletInfo from './components/WalletInfo';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (typeof window.ethereum === 'undefined') {
        toast.error('Please install MetaMask to use this app');
        return;
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId === 1n) {
        toast.error('Please switch to a testnet network in MetaMask');
        return;
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      setWallet({
        address,
        signer,
        provider,
      });
      setBalance(ethers.formatEther(balance));
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error(error.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setBalance('0');
    toast.success('Wallet disconnected');
  };

  const updateBalance = async () => {
    if (!wallet) return;

    try {
      const balance = await wallet.provider.getBalance(wallet.address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          ETH Testnet Wallet - Sepolia
        </h1>

        <WalletConnect
          wallet={wallet}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
          loading={loading}
        />

        {wallet && (
          <div className="space-y-6 animate-fadeIn">
            <WalletInfo address={wallet.address} balance={balance} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TransactionForm
                signer={wallet.signer}
                onSuccess={updateBalance}
              />
              <TransactionHistory
                provider={wallet.provider}
                address={wallet.address}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
