import { Box, Autocomplete } from '@mui/material'
import { Fragment } from 'react'
import { List } from '../../types/list'
import Input from '../../components/Input'
import type { Dispatch, SetStateAction } from 'react'

type AutoCompleteAddTask = {
  categories: List[]
  setListId: Dispatch<SetStateAction<number | null>>
}

function AutoCompleteAddTask(props: AutoCompleteAddTask) {
  const { categories, setListId } = props

  return (
    <Fragment>
      <Box sx={{ p: 0, mt: '4px', mb: '4px' }}>
        <Autocomplete
          disablePortal
          options={categories}
          fullWidth
          getOptionLabel={(option) => option.name}
          onChange={(_, newValue) => {
            if (newValue) {
              setListId(newValue.id)
            }
          }}
          renderInput={(params) => (
            <Input
              {...params.InputProps}
              label="Categoria"
              {...params}
              style={{ marginTop: '-8px' }}
            />
          )}
          sx={{
            '& .MuiAutocomplete-clearIndicator': {
              display: 'none', // remove o botão
            },
            '& .MuiAutocomplete-popupIndicator': {
              display: 'none', // remove o botão
            },
          }}
        />
      </Box>
    </Fragment>
  )
}

export default AutoCompleteAddTask
