import { Autocomplete } from '@mui/material'
import { Input } from '@/components'
import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type AutoCompletePerfilParams = {
  usersRole: string
  setUsersRole: Dispatch<SetStateAction<string>>
}

function AutoCompletePerfil() {
  const roles = ['ADMIN', 'USER', 'SUPERADMIN']

  return (
    <Autocomplete
      disablePortal
      options={roles}
      fullWidth
      getOptionLabel={(option) => option}
      onChange={(_, newValue) => {
        if (newValue) {
          setUsersRole(newValue)
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
  )
}

export default AutoCompletePerfil
