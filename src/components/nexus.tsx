import { Card, CardContent } from './ui/card'
import {
  BridgeAndExecuteButton,
  BridgeButton,
  TOKEN_CONTRACT_ADDRESSES,
  TOKEN_METADATA,
  TransferButton,
} from 'avail-nexus-sdk'
import { Button } from './ui/button'
import { parseUnits } from 'viem'

const Nexus = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col justify-center items-center gap-y-4">
          <div className="w-full flex items-center gap-x-4">
            <div className="bg-white rounded-lg border p-6 shadow-sm text-center w-1/2">
              <h3 className="text-lg font-semibold mb-4">Bridge Tokens</h3>
              <BridgeButton>
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={onClick}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? 'Loading...' : 'Open Bridge'}
                  </Button>
                )}
              </BridgeButton>
            </div>
            <div className="bg-white rounded-lg border p-6 shadow-sm text-center w-1/2">
              <h3 className="text-lg font-semibold mb-4">Transfer Tokens</h3>
              <TransferButton>
                {({ onClick, isLoading }) => (
                  <Button
                    onClick={onClick}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? 'Loading...' : 'Open Transfer'}
                  </Button>
                )}
              </TransferButton>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6 shadow-sm text-center w-3/4">
            <h3 className="text-lg font-semibold mb-4">
              Bridge & Stake USDT on AAVE
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
                  className="w-full"
                >
                  {isLoading ? 'Processing…' : 'Bridge & Stake'}
                </Button>
              )}
            </BridgeAndExecuteButton>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Nexus
