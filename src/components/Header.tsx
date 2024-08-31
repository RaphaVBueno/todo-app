import Stack from '@mui/material/Stack'
import CustomDatePicker from './CustomDatePicker'
import type { Dispatch, SetStateAction } from 'react'
import Search from './Search'
import { Typography } from '@mui/material'
import { showDate } from '../utils'

type HeaderProps = {
  /**
   * Data a ser exibida no cabeçalho
   */
  date: Date | null
  setDate: Dispatch<SetStateAction<Date | null>>
}

export default function Header(props: HeaderProps) {
  const { date, setDate } = props
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
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
        <Search />
        <CustomDatePicker date={date} setDate={setDate} />
      </Stack>
    </Stack>
  )
}
