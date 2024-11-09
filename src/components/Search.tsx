import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { CircularProgress } from '@mui/material'
import { type Dispatch, type SetStateAction } from 'react'

type SearchProps = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  isFetching: boolean
}

export default function Search(props: SearchProps) {
  const { search, setSearch, isFetching } = props

  return (
    <FormControl
      sx={{ width: { xs: '100%', md: '25ch' } }}
      variant="outlined"
      // error={Boolean(searchError)}
    >
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Buscar..."
        value={search}
        endAdornment={
          isFetching && (
            <InputAdornment position="end" sx={{ color: 'text.primary' }}>
              <CircularProgress size="1rem" />
            </InputAdornment>
          )
        }
        onChange={(event) => {
          setSearch(event.target.value)
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
