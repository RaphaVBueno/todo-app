import Stack from '@mui/material/Stack'
import CustomDatePicker from './CustomDatePicker'
import { type Dispatch, type SetStateAction } from 'react'
import Search from './Search'
import { Typography } from '@mui/material'
import { showDate } from '../utils'
import FilterButton from './FilterButton'
import type { List } from '../types/list'
import { greetings } from '../utils/greetings'

type HeaderProps = {
  /**
   * Data a ser exibida no cabeçalho
   */
  date: Date | null
  setDate: Dispatch<SetStateAction<Date | null>>
  filter: number | null
  setFilter: Dispatch<SetStateAction<number | null>>
  categories: List[]
}

export default function Header(props: HeaderProps) {
  const { date, setDate, filter, setFilter, categories } = props

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
          {greetings()}
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
        <Search />
        <CustomDatePicker date={date} setDate={setDate} />
      </Stack>
    </Stack>
  )
}
