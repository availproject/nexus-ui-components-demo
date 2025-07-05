import { PrivyProvider } from '@privy-io/react-auth'
import { NexusProvider, type NexusNetwork } from '@avail-project/nexus'
import {
  base,
  polygon,
  arbitrum,
  optimism,
  mainnet,
  scroll,
  avalanche,
  sepolia,
  baseSepolia,
  arbitrumSepolia,
  optimismSepolia,
  polygonAmoy,
} from 'viem/chains'
import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react'

const Web3Context = createContext<{
  network: NexusNetwork | undefined
  setNetwork: Dispatch<SetStateAction<NexusNetwork | undefined>>
}>({
  network: 'mainnet',
  setNetwork: () => {},
})

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
          mainnet,
          optimism,
          scroll,
          avalanche,
          sepolia,
          baseSepolia,
          arbitrumSepolia,
          optimismSepolia,
          polygonAmoy,
        ],
        defaultChain: mainnet,
      }}
    >
      <NexusProvider
        config={{
          network: 'mainnet', // change to 'testnet' for testnet
        }}
      >
        {children}
      </NexusProvider>
    </PrivyProvider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}

export default Web3Provider
