import { Outlet, createRootRoute } from '@tanstack/react-router'
import { PrivyProvider } from '@privy-io/react-auth'
import { NexusProvider } from '@avail-project/nexus'
import {
  base,
  polygon,
  arbitrum,
  optimism,
  mainnet,
  scroll,
  avalanche,
} from 'viem/chains'
import Header from '@/components/header'

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID
export const Route = createRootRoute({
  component: () => {
    return (
      <PrivyProvider
        appId={privyAppId}
        config={{
          appearance: {
            theme: 'light',
            accentColor: '#676FFF',
          },
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
          },
          loginMethods: ['email', 'wallet'],
          externalWallets: {
            coinbaseWallet: {
              connectionOptions: 'all',
            },
            walletConnect: {
              enabled: true,
            },
          },
          supportedChains: [
            base,
            polygon,
            arbitrum,
            mainnet,
            optimism,
            scroll,
            avalanche,
          ],
          defaultChain: mainnet,
        }}
      >
        <NexusProvider>
          <Header />
          <Outlet />
        </NexusProvider>
      </PrivyProvider>
    )
  },
})
