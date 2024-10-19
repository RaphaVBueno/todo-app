import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import {
  createTheme,
  ThemeProvider,
  styled,
  PaletteMode,
} from '@mui/material/styles'
import getSignUpTheme from './getSignUpTheme'
import TemplateFrame from './TemplateFrame'
import { useState } from 'react'
import CustomFormControl from './CustomFormControl'
import { addUser } from '../../../utils'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}))

//adicionar msg de sucesso ou falha na criação do usuário, fazer verificação de erros no backend
export default function SignUp() {
  const [mode, setMode] = useState<PaletteMode>('light')
  const [showCustomTheme, setShowCustomTheme] = useState(true)
  const defaultTheme = createTheme({ palette: { mode } })
  const SignUpTheme = createTheme(getSignUpTheme(mode))
  const [nameError, setNameError] = useState(false)
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [dateError, setDateError] = useState(false)
  const [dateErrorMessage, setDateErrorMessage] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)
  }

  const toggleCustomTheme = () => {
    setShowCustomTheme(prev => !prev)
  }

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement
    const password = document.getElementById('password') as HTMLInputElement
    const name = document.getElementById('name') as HTMLInputElement
    const date = document.getElementById('birthDate') as HTMLInputElement
    const username = document.getElementById('username') as HTMLInputElement

    let isValid = true

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true)
      setEmailErrorMessage('Por favor entre um email válido')
      isValid = false
    } else {
      setEmailError(false)
      setEmailErrorMessage('')
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true)
      setPasswordErrorMessage('Sua senha deve conter pelo menos 6 caracteres.')
      isValid = false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage('')
    }

    if (!name.value || name.value.length < 3) {
      setNameError(true)
      setNameErrorMessage('Um nome é necessário.')
      isValid = false
    } else {
      setNameError(false)
      setNameErrorMessage('')
    }

    if (!date.value) {
      setDateError(true)
      setDateErrorMessage('Adicione uma data Valida.')
      isValid = false
    } else {
      setDateError(false)
      setDateErrorMessage('')
    }

    if (!username.value || name.value.length < 3) {
      setUsernameError(true)
      setUsernameErrorMessage('Adicione um usuário valido.')
      isValid = false
    } else {
      setUsernameError(false)
      setUsernameErrorMessage('')
    }

    return isValid
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValid = validateInputs()

    if (!isValid) {
      return
    }
    const form = event.currentTarget
    const userData = {
      email: (form.querySelector('#email') as HTMLInputElement).value,
      password: (form.querySelector('#password') as HTMLInputElement).value,
      name: (form.querySelector('#name') as HTMLInputElement).value,
      birthDate: (form.querySelector('#birthDate') as HTMLInputElement).value,
      username: (form.querySelector('#username') as HTMLInputElement).value,
    }
    await addUser(userData)
  }

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Cadastro
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <CustomFormControl
                formTitle="Nome"
                formName="name"
                placeholder="Seu Nome"
                error={nameError}
                helperText={nameErrorMessage}
              />
              <CustomFormControl
                formTitle="Nome do usuário"
                formName="username"
                placeholder="Seu Nome de Usuário"
                error={usernameError}
                helperText={usernameErrorMessage}
              />
              <CustomFormControl
                formTitle="Email"
                formName="email"
                placeholder="seu@email.com"
                error={emailError}
                helperText={emailErrorMessage}
              />

              <FormControl>
                <FormLabel htmlFor="birthDate">Data de Nascimento</FormLabel>
                <TextField
                  type="date"
                  required
                  fullWidth
                  id="birthDate"
                  placeholder="seu@email.com"
                  name="birthDate"
                  variant="outlined"
                  error={dateError} //customizar esse erro
                  helperText={dateErrorMessage}
                  color={dateError ? 'error' : 'primary'}
                />
              </FormControl>
              <CustomFormControl
                formTitle="Senha"
                formName="password"
                placeholder="••••••"
                error={passwordError}
                helperText={passwordErrorMessage}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Inscrever-se
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Já tem uma conta?{' '}
                <span>
                  <Link
                    href="/login"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Entrar
                  </Link>
                </span>
              </Typography>
            </Box>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            ></Box>
          </Card>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  )
}
