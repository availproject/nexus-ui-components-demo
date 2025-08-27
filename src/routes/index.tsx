import { usePrivy, useWallets } from '@privy-io/react-auth'
import { createFileRoute } from '@tanstack/react-router'
import { Activity } from 'lucide-react'
import Nexus from '@/components/nexus'
import WalletConnection from '@/components/connect-wallet'
import ViewUnifiedBalance from '@/components/view-balance'
import Links from '@/components/links'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { ready, authenticated } = usePrivy()
  const { wallets } = useWallets()

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Nexus Upgrade</h1>
          <p className="text-lg text-muted-foreground font-semibold">
            Allow users to seamlessly move tokens into your dApp, no bridging,
            and no confusion. Connect your wallet to experience the Nexus
            Effect.
          </p>
        </div>
        {authenticated && wallets.length > 0 && (
          <div className="flex items-center flex-col gap-y-2">
            <ViewUnifiedBalance />
            <Nexus />
          </div>
        )}

        <div className="text-center">
          {!ready && <Activity className="animate-pulse mx-auto" />}
          {ready && <WalletConnection />}
        </div>
      </div>

      <div className="mx-auto px-4 py-8 w-fit -translate-y-12">
        <Links />
      </div>
    </div>
  )
}
