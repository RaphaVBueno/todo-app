import { Fragment } from 'react'
import { Box, TextField } from '@mui/material'
import type { Dispatch, SetStateAction } from 'react'

type InputPadraoProps = {
  action: Dispatch<SetStateAction<string>>
  inputName: string
  value: string | null
}

function InputPadrao(props: InputPadraoProps) {
  const { action, inputName, value } = props

  return (
    <Fragment>
      <TextField
        id="outlined-basic"
        label={inputName}
        variant="outlined"
        fullWidth
        sx={{
          '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
          '& .MuiFormLabel-root': { fontSize: '1.1rem' },
        }}
        value={value}
        onChange={(event) => action(event.target.value)}
      />
    </Fragment>
  )
}

export default InputPadrao
