import { NexusProvider } from '@avail-project/nexus-widgets'
import { WagmiProvider, createConfig, http } from 'wagmi'
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
  sepolia,
} from 'wagmi/chains'
import { createContext, useContext, useMemo, useState } from 'react'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import type { NexusNetwork } from '@avail-project/nexus-widgets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
const config = createConfig(
  getDefaultConfig({
    chains: [
      mainnet,
      base,
      polygon,
      arbitrum,
      optimism,
      scroll,
      avalanche,
      sophon,
      kaia,
      sepolia,
      baseSepolia,
      arbitrumSepolia,
      optimismSepolia,
      polygonAmoy,
    ],
    transports: {
      [mainnet.id]: http(mainnet.rpcUrls.default.http[0]),
      [arbitrum.id]: http(arbitrum.rpcUrls.default.http[0]),
      [base.id]: http(base.rpcUrls.default.http[0]),
      [optimism.id]: http(optimism.rpcUrls.default.http[0]),
      [polygon.id]: http(polygon.rpcUrls.default.http[0]),
      [avalanche.id]: http(avalanche.rpcUrls.default.http[0]),
      [scroll.id]: http(scroll.rpcUrls.default.http[0]),
      [sophon.id]: http(sophon.rpcUrls.default.http[0]),
      [kaia.id]: http(kaia.rpcUrls.default.http[0]),
      [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
      [baseSepolia.id]: http(baseSepolia.rpcUrls.default.http[0]),
      [arbitrumSepolia.id]: http(arbitrumSepolia.rpcUrls.default.http[0]),
      [optimismSepolia.id]: http(optimismSepolia.rpcUrls.default.http[0]),
      [polygonAmoy.id]: http(polygonAmoy.rpcUrls.default.http[0]),
    },

    walletConnectProjectId: walletConnectProjectId!,

    // Required App Info
    appName: 'Avail Nexus',

    // Optional App Info
    appDescription: 'Avail Nexus',
    appUrl: 'https://www.availproject.org/',
    appIcon:
      'https://www.availproject.org/_next/static/media/avail_logo.9c818c5a.png',
  }),
)
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
          <ConnectKitProvider theme="soft" mode="light">
            <NexusProvider
              config={{
                debug: true,
                network: 'mainnet',
              }}
            >
              {children}
            </NexusProvider>
          </ConnectKitProvider>
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
