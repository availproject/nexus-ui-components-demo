import { PrivyProvider } from '@privy-io/react-auth'
import { NexusProvider } from '@avail-project/nexus/ui'
import {
  base,
  polygon,
  arbitrum,
  optimism,
  scroll,
  avalanche,
  baseSepolia,
  arbitrumSepolia,
  optimismSepolia,
  polygonAmoy,
  mainnet,
  sophon,
  kaia,
} from 'viem/chains'

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID
const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#3CA3FC',
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
          mainnet,
          sophon,
          kaia,
          base,
          polygon,
          arbitrum,
          optimism,
          scroll,
          avalanche,
          baseSepolia,
          arbitrumSepolia,
          optimismSepolia,
          polygonAmoy,
        ],
        defaultChain: mainnet,
      }}
    >
      <NexusProvider>{children}</NexusProvider>
    </PrivyProvider>
  )
}

export default Web3Provider
