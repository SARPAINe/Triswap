// create transaction receipt
// get balance

import { TransactionReceipt, Web3BaseWalletAccount } from 'web3'
import { connectBC, toObject } from '../utils'

const getEthBalance = async (privateKey: string) => {
  const web3 = await connectBC()
  const account = await getAccount(privateKey)
  const balanceInWei = await web3.eth.getBalance(account.address)
  return weiToEth(balanceInWei)
}

const sendEth = async (privateKey: string, value: string, to: string) => {
  const web3 = await connectBC()
  const account = await getAccount(privateKey)
  const txReceipt = await web3.eth.sendTransaction({
    from: account.address,
    to,
    value: web3.utils.toWei(value, 'ether'),
  })

  return formatTxReceipt(txReceipt)
}

const getAccount = async (
  privateKey: string,
): Promise<Web3BaseWalletAccount> => {
  const web3 = await connectBC()

  const account = web3.eth.accounts.wallet.add(privateKey).get(0)

  if (!account) {
    throw new Error('Invalid private key')
  }
  return account
}

const formatTxReceipt = (txRecipt: TransactionReceipt): JSON => {
  return toObject(txRecipt)
}

const weiToEth = async (value: bigint): Promise<string> => {
  const web3 = await connectBC()
  return web3.utils.fromWei(value.toString(), 'ether').toString()
}

const ethServices = { getEthBalance, weiToEth, sendEth }
export default ethServices
