export default function WalletInfo({ address, balance }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Wallet Information</h2>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-medium">Address:</span>{' '}
          <span className="font-mono">{address}</span>
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Balance:</span>{' '}
          <span>{balance} ETH</span>
        </p>
      </div>
    </div>
  );
}