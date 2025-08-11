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
import { createContext, useContext, useMemo, useState } from 'react'
import type { NexusNetwork } from '@avail-project/nexus/core'

interface Web3ContextValue {
  network: NexusNetwork
  setNetwork: React.Dispatch<React.SetStateAction<NexusNetwork>>
}

const Web3Context = createContext<Web3ContextValue | null>(null)

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID
const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [network, setNetwork] = useState<NexusNetwork>('mainnet')
  const value = useMemo(() => ({ network, setNetwork }), [network])
  return (
    <Web3Context.Provider value={value}>
      <PrivyProvider
        appId={privyAppId}
        config={{
          appearance: {
            theme: 'light',
            accentColor: '#3CA3FC',
          },
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
        <NexusProvider
          config={{
            debug: true,
            network: 'mainnet',
          }}
        >
          {children}
        </NexusProvider>
      </PrivyProvider>
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
