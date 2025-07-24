import { Card, CardContent } from './ui/card'
import {
  BridgeAndExecuteButton,
  BridgeButton,
  TransferButton,
} from '@avail-project/nexus/ui'
import {
  SUPPORTED_CHAINS,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
} from '@avail-project/nexus/core'
import { Button } from './ui/button'
import { parseUnits } from 'viem'

const Nexus = () => {
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="w-full flex items-center gap-x-4">
            <div className="bg-card rounded-lg border border-gray-400 p-6 shadow-sm text-center w-1/2">
              <h3 className="text-lg font-semibold mb-4">Bridge Tokens</h3>
              <BridgeButton>
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={() => {
                      console.log('clicked')
                      onClick()
                    }}
                    disabled={isLoading}
                    className="w-full font-bold rounded-lg"
                  >
                    {isLoading ? 'Loading...' : 'Open Bridge'}
                  </Button>
                )}
              </BridgeButton>
            </div>
            <div className="bg-card rounded-lg border border-gray-400 p-6 shadow-sm text-center w-1/2">
              <h3 className="text-lg font-semibold mb-4">Transfer Tokens</h3>
              <TransferButton>
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={onClick}
                    disabled={isLoading}
                    className="w-full font-bold rounded-lg"
                  >
                    {isLoading ? 'Loading...' : 'Open Transfer'}
                  </Button>
                )}
              </TransferButton>
            </div>
          </div>
          <div className="w-full flex items-center gap-x-4">
            <div className="bg-card rounded-lg border border-gray-400 p-6 shadow-sm text-center w-3/4">
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
                  toChainId: 42161,
                  token: 'USDT',
                }}
              >
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={onClick}
                    disabled={isLoading}
                    className="w-full font-bold rounded-lg"
                  >
                    {isLoading ? 'Processing…' : 'Bridge & Stake'}
                  </Button>
                )}
              </BridgeAndExecuteButton>
            </div>
            <div className="bg-card rounded-lg border border-gray-400 p-6 shadow-sm text-center w-3/4">
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
                    onClick={onClick}
                    disabled={isLoading}
                    className="w-full font-bold rounded-lg"
                  >
                    {isLoading ? 'Processing…' : 'Bridge & Stake'}
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
