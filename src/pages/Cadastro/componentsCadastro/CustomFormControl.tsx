import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'

type CustomFormControlProps = {
  formTitle: string
  formName: string
  placeholder: string | undefined
  error: boolean | undefined
  helperText: string | null
}

function CustomFormControl(props: CustomFormControlProps) {
  const { formName, placeholder, error, helperText, formTitle } = props

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
      />
    </FormControl>
  )
}

export default CustomFormControl
