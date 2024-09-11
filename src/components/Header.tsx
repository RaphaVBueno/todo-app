import Stack from '@mui/material/Stack'
import CustomDatePicker from './CustomDatePicker'
import { useState, type Dispatch, type SetStateAction } from 'react'
import Search from './Search'
import { Typography } from '@mui/material'
import { devUser, getUserLists, showDate } from '../utils'
import FilterButton from './FilterButton'
import { useQuery } from '@tanstack/react-query'
import type { List } from '../types/list'

type HeaderProps = {
  /**
   * Data a ser exibida no cabeçalho
   */
  date: Date | null
  setDate: Dispatch<SetStateAction<Date | null>>
}

export default function Header(props: HeaderProps) {
  const { date, setDate } = props

  const { error, data: categories } = useQuery<List[]>({
    queryKey: ['list'],
    queryFn: () => getUserLists(devUser),
  })
  if (error) return 'Erro'

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
          Bom dia
        </Typography>
        <Typography variant="body1" component="p">
          {showDate(date)}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ gap: 1 }}>
        <FilterButton categories={categories || []} />
        <Search />
        <CustomDatePicker date={date} setDate={setDate} />
      </Stack>
    </Stack>
  )
}
