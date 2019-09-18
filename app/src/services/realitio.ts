import { ethers } from 'ethers'
import { Moment } from 'moment'

import { getLogger } from '../util/logger'
import { getContractAddress } from '../util/addresses'

const logger = getLogger('Services::Realitio')

const realitioAbi = [
  'function askQuestion(uint256 template_id, string question, address arbitrator, uint32 timeout, uint32 opening_ts, uint256 nonce) public payable returns (bytes32)',
]
const realitioCallAbi = [
  'function askQuestion(uint256 template_id, string question, address arbitrator, uint32 timeout, uint32 opening_ts, uint256 nonce) public constant returns (bytes32)',
]

class RealitioService {
  /**
   * Create a question in the realit.io contract. Returns a promise that resolves when the transaction is mined.
   *
   * @param question - The question to ask
   * @param openingTimestamp - The moment after which the question can be answered, specified in epoch seconds
   * @param provider - ethers.js provider obtained from the web3 context
   * @param networkId - the current network id
   * @param value - The amount of value to send, specified in wei
   *
   * @returns A promise that resolves to a string with the bytes32 corresponding to the id of the
   * question
   */
  static askQuestion = async (
    question: string,
    openingDateMoment: Moment,
    provider: any,
    networkId: number,
    value = '0',
  ): Promise<string> => {
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()

    const realitioAddress = getContractAddress(networkId, 'realitio')
    const arbitrator = getContractAddress(networkId, 'realitioArbitrator')

    // there's no way to call a non-constant method as if it were constant, so we need to instantiate two contracts,
    // with one having an ABI that pretends the method is constant
    const realitioConstantContract = new ethers.Contract(realitioAddress, realitioCallAbi, provider)
    const realitioContract = new ethers.Contract(realitioAddress, realitioAbi, provider).connect(
      signer,
    )

    const openingTimestamp = openingDateMoment.unix()
    const args = [0, question, arbitrator, '86400', openingTimestamp, 0]

    const questionId = await realitioConstantContract.askQuestion(...args, { from: signerAddress })

    // send the transaction and wait until it's mined
    const transactionObject = await realitioContract.askQuestion(...args, {
      value: ethers.utils.bigNumberify(value),
    })
    logger.log(`Ask question transaction hash: ${transactionObject.hash}`)

    return questionId
  }
}

export { RealitioService }