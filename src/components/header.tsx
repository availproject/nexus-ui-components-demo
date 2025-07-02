import { Link } from '@tanstack/react-router'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { ready, user, logout, authenticated } = usePrivy()
  const { wallets } = useWallets()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack,
        })
      }
    }
  }

  return (
    <header className="p-4 flex gap-4 bg-white text-black justify-between items-center shadow-md">
      <nav className="flex flex-row">
        <div className="px-2 font-bold text-lg">
          <Link to="/">Avail Nexus</Link>
        </div>
      </nav>

      <div className="flex items-center gap-4">
        {ready && wallets.length > 0 && authenticated && (
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-600">Connected as:</span>
              <div className="font-medium">
                {user?.email?.address ||
                  (wallets[0]?.address
                    ? `${wallets[0].address.slice(0, 6)}...${wallets[0].address.slice(-4)}`
                    : 'Unknown')}
              </div>
              {wallets.length > 0 && (
                <div className="text-xs text-gray-500">
                  {wallets.length} wallet{wallets.length > 1 ? 's' : ''}{' '}
                  connected
                </div>
              )}
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Disconnect
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
