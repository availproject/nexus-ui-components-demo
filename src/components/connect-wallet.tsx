import { useNexus, type EthereumProvider } from '@avail-project/nexus-widgets'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export default function WalletConnection() {
  const { setProvider, provider, isSdkInitialized, deinitializeSdk } =
    useNexus()
  const { status, connector } = useAccount()

  const setupProvider = async () => {
    try {
      const ethProvider = await connector?.getProvider()
      if (!ethProvider) return
      setProvider(ethProvider as EthereumProvider)
    } catch (error) {
      console.error('Failed to setup provider:', error)
    }
  }

  useEffect(() => {
    if (!provider && status === 'connected') {
      setupProvider()
    }
    if (isSdkInitialized && provider && status === 'disconnected') {
      console.log('deinit')
      deinitializeSdk()
    }
  }, [status, provider, isSdkInitialized])

  return (
    <div
      className={cn(
        'max-w-md mx-auto p-4 flex items-center justify-center',
        status === 'connected' && 'hidden',
      )}
    >
      <ConnectButton />
    </div>
  )
}
