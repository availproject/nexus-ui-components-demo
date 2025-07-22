import {
  usePrivy,
  useWallets,
  type ConnectedWallet,
} from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import { useNexus } from '@avail-project/nexus/ui'
import { useEffect, useState } from 'react'

export default function WalletConnection() {
  const { connectWallet, login, authenticated } = usePrivy()
  const { wallets } = useWallets()
  const { setProvider, provider } = useNexus()
  const [isConnecting, setIsConnecting] = useState(false)

  const setupProvider = async (wallet: ConnectedWallet) => {
    try {
      const ethProvider = await wallet.getEthereumProvider()
      setProvider(ethProvider)
    } catch (error) {
      console.error('Failed to setup provider:', error)
    }
  }

  const connectExternalWallet = async () => {
    try {
      setIsConnecting(true)
      if (!authenticated) {
        login()
      } else {
        connectWallet()
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const connectedWallet = wallets[0]

  useEffect(() => {
    if (connectedWallet && !provider) {
      setupProvider(connectedWallet)
    }
  }, [connectedWallet, provider])

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center">
        <Button
          onClick={connectExternalWallet}
          disabled={isConnecting || (authenticated && wallets?.length > 0)}
          size="lg"
          className="min-w-[200px]"
        >
          {isConnecting
            ? 'Connecting...'
            : authenticated && wallets?.length > 0
              ? 'Connected'
              : 'Connect Wallet & Login'}
        </Button>
      </div>
    </div>
  )
}
