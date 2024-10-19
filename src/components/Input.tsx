import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import TextField, { TextFieldProps } from '@mui/material/TextField'

interface InputProps
  extends Omit<TextFieldProps<'outlined'>, 'variant' | 'error'> {
  error?: string
}

function Input(props: InputProps) {
  const { name, label, required = true, error, ...rest } = props
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <TextField
        error={Boolean(error)}
        helperText={error}
        id={name}
        name={name}
        autoFocus
        fullWidth
        required={required}
        variant="outlined"
        color={error ? 'error' : 'primary'}
        aria-label={name}
        {...rest}
      />
    </FormControl>
  )
}

export default Input
