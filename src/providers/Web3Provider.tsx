import { NexusProvider } from '@avail-project/nexus-widgets'
import { WagmiProvider } from 'wagmi'
import { defineChain, type Chain } from 'viem'
import {
  base,
  polygon,
  arbitrum,
  optimism,
  scroll,
  avalanche,
  bsc,
  baseSepolia,
  arbitrumSepolia,
  optimismSepolia,
  polygonAmoy,
  mainnet,
  kaia,
  sepolia,
} from 'wagmi/chains'

import { createContext, useContext, useMemo, useState } from 'react'
import type { NexusNetwork } from '@avail-project/nexus-widgets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

// Hyperliquid HyperEVM custom chain
const hyperEVM = defineChain({
  id: 999,
  name: 'HyperEVM',
  nativeCurrency: { name: 'HYPE', symbol: 'HYPE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.hyperliquid.xyz/evm'] },
  },
  blockExplorers: {
    default: { name: 'HyperEVM Scan', url: 'https://hyperevmscan.io' },
  },
})

const sophon = defineChain({
  id: 50104,
  name: 'Sophon',
  nativeCurrency: {
    decimals: 18,
    name: 'Sophon',
    symbol: 'SOPH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sophon.xyz'],
      webSocket: ['wss://rpc.sophon.xyz/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Sophon Block Explorer',
      url: 'https://explorer.sophon.xyz',
    },
  },
})

// Add chain icons for RainbowKit
type RainbowKitChain = Chain & { iconUrl?: string; iconBackground?: string }

const hyperEVMWithIcon: RainbowKitChain = {
  ...hyperEVM,
  iconUrl:
    'https://assets.coingecko.com/coins/images/50882/standard/hyperliquid.jpg?1729431300',
  iconBackground: '#0a3cff',
}

const sophonWithIcon: RainbowKitChain = {
  ...sophon,
  iconUrl:
    'https://assets.coingecko.com/coins/images/38680/standard/sophon_logo_200.png?1747898236',
  iconBackground: '#6b5cff',
}

const config = getDefaultConfig({
  appName: 'Avail Nexus',
  projectId: walletConnectProjectId!,
  multiInjectedProviderDiscovery: true,
  chains: [
    mainnet,
    base,
    polygon,
    arbitrum,
    optimism,
    scroll,
    avalanche,
    bsc,
    sophonWithIcon,
    kaia,
    hyperEVMWithIcon,
    sepolia,
    baseSepolia,
    arbitrumSepolia,
    optimismSepolia,
    polygonAmoy,
  ],
})
const queryClient = new QueryClient()

interface Web3ContextValue {
  network: NexusNetwork
  setNetwork: React.Dispatch<React.SetStateAction<NexusNetwork>>
}

const Web3Context = createContext<Web3ContextValue | null>(null)

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [network, setNetwork] = useState<NexusNetwork>('mainnet')
  const value = useMemo(() => ({ network, setNetwork }), [network])

  return (
    <Web3Context.Provider value={value}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            modalSize="compact"
            theme={lightTheme({
              accentColor: '#fe8b6c',
              accentColorForeground: 'white',
            })}
          >
            <NexusProvider
              config={{
                debug: true,
                network: 'mainnet',
              }}
            >
              {children}
            </NexusProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Web3Context.Provider>
  )
}

export function useWeb3Context() {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3Context must be used within a NexusProvider')
  }
  return context
}

export default Web3Provider
