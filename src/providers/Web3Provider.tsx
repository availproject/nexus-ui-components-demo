import { NexusProvider } from '@avail-project/nexus-widgets'
import { WagmiProvider } from 'wagmi'
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
import type { NexusNetwork } from '@avail-project/nexus-widgets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

const config = getDefaultConfig({
  appName: 'Avail Nexuss',
  projectId: walletConnectProjectId!,
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
