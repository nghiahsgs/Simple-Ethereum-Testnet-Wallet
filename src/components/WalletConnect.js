export default function WalletConnect({ wallet, onConnect, onDisconnect }) {
  return (
    <div className="flex justify-center mb-8">
      {!wallet ? (
        <button
          onClick={onConnect}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      ) : (
        <button
          onClick={onDisconnect}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Disconnect Wallet
        </button>
      )}
    </div>
  );
}