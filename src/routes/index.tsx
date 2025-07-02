import { usePrivy, useWallets } from '@privy-io/react-auth'
import { createFileRoute } from '@tanstack/react-router'
import { Activity } from 'lucide-react'
import Nexus from '@/components/nexus'
import WalletConnection from '@/components/connect-wallet'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { ready } = usePrivy()
  const { wallets } = useWallets()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Nexus SDK Demo</h1>
          <p className="text-lg text-gray-600">
            Connect your wallet and start cross chain transactions with the
            Nexus SDK
          </p>
        </div>

        {wallets.length > 0 && <Nexus />}
        <div className="text-center">
          {!ready ? (
            <Activity className="animate-pulse mx-auto" />
          ) : (
            <WalletConnection />
          )}
        </div>
      </div>
    </div>
  )
}
