import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'ETH Testnet Wallet',
  description: 'Simple Ethereum testnet wallet',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}