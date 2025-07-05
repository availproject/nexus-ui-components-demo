import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '@/components/header'
import Web3Provider from '@/providers/Web3Provider'

export const Route = createRootRoute({
  component: () => {
    return (
      <Web3Provider>
        <Header />
        <Outlet />
      </Web3Provider>
    )
  },
})
