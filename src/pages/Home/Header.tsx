import { type Dispatch, type SetStateAction } from 'react'
import { useMemo } from 'react'
import Stack from '@mui/material/Stack'
import CustomDatePicker from '../../components/CustomDatePicker'
import Search from '../../components/Search'
import { Typography } from '@mui/material'
import { showDate } from '../../utils'
import FilterButton from '../../components/FilterButton'
import type { List } from '../../types/list'
import { greetings } from '../../utils/greetings'

type HeaderProps = {
  /**
   * Data a ser exibida no cabeçalho
   */
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
  filter: number | null
  setFilter: Dispatch<SetStateAction<number | null>>
  categories: List[]
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  isFetching: boolean
}

export default function Header(props: HeaderProps) {
  const {
    date,
    setDate,
    filter,
    setFilter,
    categories,
    search,
    setSearch,
    isFetching,
  } = props
  const greeting = useMemo(() => greetings(), [])

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
      }}
      spacing={2}
    >
      <Stack>
        <Typography variant="h3" component="h1">
          {greeting}
        </Typography>
        <Typography variant="body1" component="p">
          {showDate(date)}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ gap: 1 }}>
        <FilterButton
          categories={categories || []}
          filter={filter}
          setFilter={setFilter}
        />
        <Search search={search} setSearch={setSearch} isFetching={isFetching} />
        <CustomDatePicker date={date} setDate={setDate} />
      </Stack>
    </Stack>
  )
}
