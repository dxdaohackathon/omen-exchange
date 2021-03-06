import { useQuery } from '@apollo/react-hooks'
import Big from 'big.js'
import { BigNumber, bigNumberify } from 'ethers/utils'
import gql from 'graphql-tag'
import { useEffect, useState } from 'react'

import { getOutcomes } from '../util/networks'
import { isObjectEqual, waitABit } from '../util/tools'
import { Question, Status } from '../util/types'

const query = gql`
  query GetMarket($id: ID!) {
    fixedProductMarketMaker(id: $id) {
      id
      creator
      collateralToken
      fee
      collateralVolume
      outcomeTokenAmounts
      condition {
        id
        payouts
      }
      templateId
      title
      outcomes
      category
      language
      lastActiveDay
      runningDailyVolume
      arbitrator
      creationTimestamp
      openingTimestamp
      timeout
      resolutionTimestamp
      currentAnswer
      answerFinalizedTimestamp
      scaledLiquidityParameter
      runningDailyVolumeByHour
      isPendingArbitration
      arbitrationOccurred
      currentAnswerTimestamp
      runningDailyVolumeByHour
      curatedByDxDao
      curatedByDxDaoOrKleros
      question {
        id
        data
      }
      klerosTCRregistered
    }
  }
`

type GraphResponseFixedProductMarketMaker = {
  id: string
  answerFinalizedTimestamp: Maybe<string>
  arbitrator: string
  category: string
  collateralToken: string
  collateralVolume: string
  condition: {
    id: string
    payouts: Maybe<string[]>
  }
  creator: string
  currentAnswer: string
  fee: string
  lastActiveDay: string
  runningDailyVolume: string
  language: string
  creationTimestamp: string
  openingTimestamp: string
  outcomeTokenAmounts: string[]
  outcomes: Maybe<string[]>
  isPendingArbitration: boolean
  arbitrationOccurred: boolean
  currentAnswerTimestamp: string
  runningDailyVolumeByHour: BigNumber[]
  question: {
    id: string
    data: string
  }
  resolutionTimestamp: string
  templateId: string
  timeout: string
  title: string
  scaledLiquidityParameter: string
  klerosTCRregistered: boolean
  curatedByDxDao: boolean
  curatedByDxDaoOrKleros: boolean
}

type GraphResponse = {
  fixedProductMarketMaker: Maybe<GraphResponseFixedProductMarketMaker>
}

export type GraphMarketMakerData = {
  address: string
  answerFinalizedTimestamp: Maybe<BigNumber>
  arbitratorAddress: string
  collateralAddress: string
  creationTimestamp: string
  collateralVolume: BigNumber
  lastActiveDay: number
  dailyVolume: BigNumber
  conditionId: string
  payouts: Maybe<Big[]>
  fee: BigNumber
  question: Question
  scaledLiquidityParameter: number
  klerosTCRregistered: boolean
  curatedByDxDao: boolean
  curatedByDxDaoOrKleros: boolean
  runningDailyVolumeByHour: BigNumber[]
}

type Result = {
  fetchData: () => Promise<void>
  marketMakerData: Maybe<GraphMarketMakerData>
  status: Status
}

const wrangleResponse = (data: GraphResponseFixedProductMarketMaker, networkId: number): GraphMarketMakerData => {
  const outcomes = data.outcomes ? data.outcomes : getOutcomes(networkId, +data.templateId)

  return {
    address: data.id,
    answerFinalizedTimestamp: data.answerFinalizedTimestamp ? bigNumberify(data.answerFinalizedTimestamp) : null,
    arbitratorAddress: data.arbitrator,
    collateralAddress: data.collateralToken,
    creationTimestamp: data.creationTimestamp,
    collateralVolume: bigNumberify(data.collateralVolume),
    lastActiveDay: Number(data.lastActiveDay),
    dailyVolume: bigNumberify(data.runningDailyVolume),
    conditionId: data.condition.id,
    payouts: data.condition.payouts ? data.condition.payouts.map(payout => new Big(payout)) : null,
    fee: bigNumberify(data.fee),
    scaledLiquidityParameter: parseFloat(data.scaledLiquidityParameter),
    runningDailyVolumeByHour: data.runningDailyVolumeByHour,
    question: {
      id: data.question.id,
      templateId: +data.templateId,
      raw: data.question.data,
      title: data.title,
      category: data.category,
      resolution: new Date(1000 * +data.openingTimestamp),
      arbitratorAddress: data.arbitrator,
      outcomes,
      isPendingArbitration: data.isPendingArbitration,
      arbitrationOccurred: data.arbitrationOccurred,
      currentAnswerTimestamp: data.currentAnswerTimestamp ? bigNumberify(data.currentAnswerTimestamp) : null,
    },
    curatedByDxDao: data.curatedByDxDao,
    klerosTCRregistered: data.klerosTCRregistered,
    curatedByDxDaoOrKleros: data.curatedByDxDaoOrKleros,
  }
}

let needRefetch = false

/**
 * Get data from the graph for the given market maker. All the information returned by this hook comes from the graph,
 * other necessary information should be fetched from the blockchain.
 */
export const useGraphMarketMakerData = (marketMakerAddress: string, networkId: number): Result => {
  const [marketMakerData, setMarketMakerData] = useState<Maybe<GraphMarketMakerData>>(null)
  const [needUpdate, setNeedUpdate] = useState<boolean>(false)

  const { data, error, loading, refetch } = useQuery<GraphResponse>(query, {
    notifyOnNetworkStatusChange: true,
    skip: false,
    variables: { id: marketMakerAddress },
  })

  useEffect(() => {
    setNeedUpdate(true)
  }, [marketMakerAddress])

  if (data && data.fixedProductMarketMaker && data.fixedProductMarketMaker.id === marketMakerAddress) {
    const rangledValue = wrangleResponse(data.fixedProductMarketMaker, networkId)
    if (needUpdate) {
      setMarketMakerData(rangledValue)
      setNeedUpdate(false)
    } else if (!isObjectEqual(marketMakerData, rangledValue)) {
      setMarketMakerData(rangledValue)
      needRefetch = false
    }
  }

  const fetchData = async () => {
    needRefetch = true
    let counter = 0
    await waitABit()
    while (needRefetch && counter < 15) {
      await refetch()
      await waitABit()
      counter += 1
    }
  }

  return {
    fetchData,
    marketMakerData: error ? null : marketMakerData,
    status: error ? Status.Error : loading ? Status.Loading : Status.Ready,
  }
}
