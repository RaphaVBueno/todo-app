import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useState } from 'react'
import { Task } from '../types'
import { searchTask } from '../utils'
import { type Dispatch, type SetStateAction } from 'react'

type SearchProps = {
  setSearchList: Dispatch<SetStateAction<Task[] | null>>
}

export default function Search(props: SearchProps) {
  const { setSearchList } = props
  const [search, setSearch] = useState<string>('')

  const handleSubmit = async () => {
    if (search.trim().length >= 3) {
      const tasks = await searchTask(search)
      setSearchList(tasks)
    } else {
      setSearchList(null)
    }
  }

  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Buscar..."
        value={search}
        onChange={(event) => {
          setSearch(event.target.value), handleSubmit()
        }}
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
