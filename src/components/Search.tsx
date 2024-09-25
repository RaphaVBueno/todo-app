import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useState } from 'react'
import { Task } from '../types'

type SearchProps = {
  searchList: Task | null
}

export default function Search(props: SearchProps) {
  const [search, setSearch] = useState<string>('')
  const [searchList, setSearchList] = useState<Task | null>(null)

  const handleSubmit = (event: any) => {
    setSearch(event.target.value)
    if (search.length >= 3) {
      //função de requisição da busca
    }
  }

  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Buscar..."
        value={search}
        onChange={(event) => handleSubmit(event)}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'Buscar',
        }}
      />
    </FormControl>
  )
}
