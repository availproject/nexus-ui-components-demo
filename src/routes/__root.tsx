import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { PrivyProvider } from '@privy-io/react-auth'
import { NexusProvider } from 'avail-nexus-sdk'
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

export const Route = createRootRoute({
  component: () => (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      clientId={import.meta.env.VITE_PRIVY_CLIENT_ID}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url.com/logo.png',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets', // or 'all-users'
          },
        },
        // Configure available login methods
        loginMethods: ['email', 'wallet', 'sms', 'google', 'apple', 'github'],
        // Configure wallet options
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
      <NexusProvider config={{ debug: true }}>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </NexusProvider>
    </PrivyProvider>
  ),
})
