import { Box, TextField, Autocomplete } from '@mui/material'
import { Fragment } from 'react'
import { List } from '../types/list'
import type { Dispatch, SetStateAction } from 'react'

type AutoCompleteTaskActionsProps = {
  categories: List[]
  setListId: Dispatch<SetStateAction<number | null | undefined>>
  listId: number | null | undefined
}

function AutoCompleteTaskActions(props: AutoCompleteTaskActionsProps) {
  const { categories, setListId, listId } = props

  const Tag = [{ title: 'Urgente' }, { title: 'Nao sei' }]

  return (
    <Fragment>
      <Box sx={{ p: 0, mt: '10px' }}>
        <Autocomplete
          disablePortal
          options={[...categories, { id: null, name: 'Remover Categoria' }]}
          getOptionLabel={(option) => option.name}
          value={categories.find((category) => category.id === listId) || null}
          onChange={(_, newValue) => {
            if (newValue) {
              setListId(newValue.id)
            } else {
              setListId(null)
            }
          }}
          onClose={(_, reason) => {
            if (reason === 'blur') {
              setListId(listId)
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categoria"
              sx={{
                '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
                '& .MuiFormLabel-root': { fontSize: '1.1rem' },
              }}
            />
          )}
          fullWidth
        />
      </Box>

      <Box sx={{ p: 0, mt: '10px', mb: '30px' }}>
        <Autocomplete
          disablePortal
          options={Tag}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tag"
              sx={{
                '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
                '& .MuiFormLabel-root': { fontSize: '1.1rem' },
              }}
            />
          )}
          fullWidth
        />
      </Box>
    </Fragment>
  )
}

export default AutoCompleteTaskActions
