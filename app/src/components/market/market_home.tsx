import React from 'react'
import styled from 'styled-components'

import { MarketWithExtraData, MarketFilters } from '../../util/types'
import { RemoteData } from '../../util/remote_data'
import { FullLoading } from '../common/full_loading'
import { ListCard } from '../common/list_card'
import { ListItem } from '../common/list_item'
import { SectionTitle } from '../common/section_title'
import { Filter } from '../common/filter'
import { ConnectedWeb3Context } from '../../hooks/connectedWeb3'
import { DisconnectedWeb3Context } from '../../hooks/disconnectedWeb3'

const FilterStyled = styled(Filter)`
  margin: -30px auto 10px;
  max-width: ${props => props.theme.list.maxWidth};
  width: 100%;
`

interface Props {
  markets: RemoteData<MarketWithExtraData[]>
  moreMarkets: boolean
  context: ConnectedWeb3Context | DisconnectedWeb3Context
  currentFilter: MarketFilters
  onFilterChange: (filter: MarketFilters) => void
  onShowMore: () => void
}

export const MarketHome: React.FC<Props> = (props: Props) => {
  const { markets, moreMarkets, context, currentFilter, onFilterChange, onShowMore } = props
  const options = [MarketFilters.AllMarkets, MarketFilters.MyMarkets, MarketFilters.FundedMarkets]

  return (
    <>
      <SectionTitle title={'MARKETS'} />
      {'account' in context && (
        <FilterStyled
          defaultOption={currentFilter}
          options={options}
          onChange={({ value }: { value: MarketFilters }) => onFilterChange(value)}
        />
      )}
      <ListCard>
        {RemoteData.is.success(markets)
          ? markets.data.map(item => {
              return <ListItem key={item.conditionId} data={item}></ListItem>
            })
          : null}
      </ListCard>
      {moreMarkets && (
        <button disabled={!RemoteData.is.success(markets)} onClick={onShowMore}>
          Show more
        </button>
      )}
      {RemoteData.is.loading(markets) ? <FullLoading message="Loading markets..." /> : null}
    </>
  )
}
