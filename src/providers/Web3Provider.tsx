import { PrivyProvider } from '@privy-io/react-auth'
import { NexusProvider } from '@avail-project/nexus'
import {
  base,
  polygon,
  arbitrum,
  optimism,
  scroll,
  avalanche,
  sepolia,
  baseSepolia,
  arbitrumSepolia,
  optimismSepolia,
  polygonAmoy,
} from 'viem/chains'

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID
const Web3Provider = ({ children }: { children: React.ReactNode }) => {
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
          optimism,
          scroll,
          avalanche,
          sepolia,
          baseSepolia,
          arbitrumSepolia,
          optimismSepolia,
          polygonAmoy,
        ],
        defaultChain: optimism,
      }}
    >
      <NexusProvider
        config={{
          network: 'testnet',
        }}
      >
        {children}
      </NexusProvider>
    </PrivyProvider>
  )
}

export default Web3Provider
