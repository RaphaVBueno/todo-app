import { forwardRef } from 'react'
import {
  FormLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
  OutlinedInputProps,
} from '@mui/material'

interface InputProps extends Omit<OutlinedInputProps, 'error'> {
  error?: string
}

const Input = forwardRef(function Input(props: InputProps, ref) {
  const { name, label, required = true, error, ...rest } = props
  return (
    <FormControl error={Boolean(error)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <OutlinedInput
        id={name}
        name={name}
        autoFocus
        fullWidth
        required={required}
        aria-label={name}
        inputRef={ref}
        {...rest}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
})

export default Input
