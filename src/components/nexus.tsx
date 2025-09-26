import { Card, CardContent } from './ui/card'
import {
  BridgeAndExecuteButton,
  BridgeButton,
  TransferButton,
  SwapButton,
  useNexus,
} from '@avail-project/nexus-widgets'
import {
  SUPPORTED_CHAINS,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
} from '@avail-project/nexus-widgets'
import { Button } from './ui/button'
import { parseUnits } from 'viem'
import { useState } from 'react'

const Nexus = () => {
  const { initializeSdk, isSdkInitialized } = useNexus()
  const [loading, setLoading] = useState(false)

  const handleInitializeSDK = async () => {
    if (isSdkInitialized) return
    setLoading(true)
    try {
      await initializeSdk()
    } catch (error) {
      console.error('Unable to initialize SDK:', error)
    } finally {
      setLoading(false)
    }
  }

  const widgetButtonClick = async (onClick: () => void) => {
    if (!isSdkInitialized) {
      await handleInitializeSDK()
    }
    onClick()
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="w-full flex items-center gap-x-4">
            <div className="bg-card rounded-lg border border-gray-400 p-6 shadow-sm text-center w-1/3">
              <h3 className="text-lg font-semibold mb-4">Bridge Tokens</h3>
              <BridgeButton>
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={() => widgetButtonClick(onClick)}
                    disabled={isLoading || loading}
                    className="w-full font-bold rounded-lg"
                  >
                    {loading
                      ? 'Initializing...'
                      : isLoading
                        ? 'Loading...'
                        : 'Open Bridge'}
                  </Button>
                )}
              </BridgeButton>
            </div>
            <div className="bg-card rounded-lg border border-gray-400 p-6 shadow-sm text-center w-1/3">
              <h3 className="text-lg font-semibold mb-4">Transfer Tokens</h3>
              <TransferButton>
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={() => widgetButtonClick(onClick)}
                    disabled={isLoading || loading}
                    className="w-full font-bold rounded-lg"
                  >
                    {loading
                      ? 'Initializing...'
                      : isLoading
                        ? 'Loading...'
                        : 'Open Transfer'}
                  </Button>
                )}
              </TransferButton>
            </div>
            <div className="bg-card rounded-lg border border-gray-400 p-6 shadow-sm text-center w-1/3">
              <h3 className="text-lg font-semibold mb-4">Swap Tokens</h3>
              <SwapButton>
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={() => widgetButtonClick(onClick)}
                    disabled={isLoading || loading}
                    className="w-full font-bold rounded-lg"
                  >
                    {loading
                      ? 'Initializing...'
                      : isLoading
                        ? 'Loading...'
                        : 'Open Swaps (beta)'}
                  </Button>
                )}
              </SwapButton>
            </div>
          </div>
          <div className="w-full flex items-center gap-x-4">
            <div
              className="bg-card rounded-lg border border-gray-400 p-6 shadow-sm text-center w-3/4"
              key={'usdt-aave'}
            >
              <h3 className="text-lg font-semibold mb-4">
                Bridge & Supply USDT on AAVE
              </h3>
              <BridgeAndExecuteButton
                contractAddress={'0x794a61358D6845594F94dc1DB02A252b5b4814aD'}
                contractAbi={
                  [
                    {
                      name: 'supply',
                      type: 'function',
                      stateMutability: 'nonpayable',
                      inputs: [
                        { name: 'asset', type: 'address' },
                        { name: 'amount', type: 'uint256' },
                        { name: 'onBehalfOf', type: 'address' },
                        { name: 'referralCode', type: 'uint16' },
                      ],
                      outputs: [],
                    },
                  ] as const
                }
                functionName="supply"
                buildFunctionParams={(token, amount, _chainId, user) => {
                  const decimals = TOKEN_METADATA[token].decimals
                  const amountWei = parseUnits(amount, decimals)
                  const tokenAddr = TOKEN_CONTRACT_ADDRESSES[token][_chainId]
                  return { functionParams: [tokenAddr, amountWei, user, 0] }
                }}
                prefill={{
                  toChainId: SUPPORTED_CHAINS.ARBITRUM,
                  token: 'USDT',
                }}
              >
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={() => widgetButtonClick(onClick)}
                    disabled={isLoading || loading}
                    className="w-full font-bold rounded-lg"
                  >
                    {loading
                      ? 'Initializing...'
                      : isLoading
                        ? 'Processing…'
                        : 'Bridge & Stake'}
                  </Button>
                )}
              </BridgeAndExecuteButton>
            </div>
            <div
              className="bg-card rounded-lg border border-gray-400 p-6 shadow-sm text-center w-3/4"
              key={'usdc-aave'}
            >
              <h3 className="text-lg font-semibold mb-4">
                Bridge & Supply USDC on AAVE
              </h3>
              <BridgeAndExecuteButton
                contractAddress={'0xA238Dd80C259a72e81d7e4664a9801593F98d1c5'}
                contractAbi={
                  [
                    {
                      inputs: [
                        {
                          internalType: 'address',
                          name: 'asset',
                          type: 'address',
                        },
                        {
                          internalType: 'uint256',
                          name: 'amount',
                          type: 'uint256',
                        },
                        {
                          internalType: 'address',
                          name: 'onBehalfOf',
                          type: 'address',
                        },
                        {
                          internalType: 'uint16',
                          name: 'referralCode',
                          type: 'uint16',
                        },
                      ],
                      name: 'supply',
                      outputs: [],
                      stateMutability: 'nonpayable',
                      type: 'function',
                    },
                  ] as const
                }
                functionName="supply"
                buildFunctionParams={(token, amount, _chainId, user) => {
                  const decimals = TOKEN_METADATA[token].decimals
                  const amountWei = parseUnits(amount, decimals)
                  const tokenAddr = TOKEN_CONTRACT_ADDRESSES[token][_chainId]
                  return { functionParams: [tokenAddr, amountWei, user, 0] }
                }}
                prefill={{
                  toChainId: SUPPORTED_CHAINS.BASE,
                  token: 'USDC',
                }}
              >
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={() => widgetButtonClick(onClick)}
                    disabled={isLoading || loading}
                    className="w-full font-bold rounded-lg"
                  >
                    {loading
                      ? 'Initializing...'
                      : isLoading
                        ? 'Processing…'
                        : 'Bridge & Stake'}
                  </Button>
                )}
              </BridgeAndExecuteButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Nexus
