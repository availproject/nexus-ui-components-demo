import { useNexus, type EthereumProvider } from '@avail-project/nexus-widgets'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ConnectKitButton } from 'connectkit'
import { useAccount, useWalletClient } from 'wagmi'

export default function WalletConnection() {
  const { setProvider, provider, isSdkInitialized, deinitializeSdk } =
    useNexus()
  const { status } = useAccount()
  const { data: walletClient } = useWalletClient()

  const setupProvider = async () => {
    try {
      const ethProvider =
        walletClient &&
        ({
          request: (args: unknown) => walletClient.request(args as any),
        } as EthereumProvider)
      console.log('ethProvider', ethProvider)
      if (!ethProvider) return
      setProvider(ethProvider)
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
      <ConnectKitButton />
    </div>
  )
}
