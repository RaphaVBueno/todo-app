import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import TextField, { TextFieldProps } from '@mui/material/TextField'

interface CustomFormControlProps extends TextFieldProps<'outlined'> {
  formTitle: string
  formName: string
  placeholder: string | undefined
  error: boolean | undefined
  helperText: string | null
}

function CustomFormControl(props: CustomFormControlProps) {
  const { formName, placeholder, error, helperText, formTitle, ...rest } = props

  return (
    <FormControl>
      <FormLabel htmlFor={formName}>{formTitle}</FormLabel>
      <TextField
        autoComplete={formName}
        name={formName}
        required
        fullWidth
        id={formName}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        color={error ? 'error' : 'primary'}
        {...rest}
      />
    </FormControl>
  )
}

export default CustomFormControl
