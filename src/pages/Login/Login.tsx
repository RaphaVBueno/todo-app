import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Typography, Stack } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import Card from '../../components/Card'
// import Input from '../../components/Input'
import { validations } from './validations'
import { login } from '../../utils'

type Fields = {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>()

  const onSubmit: SubmitHandler<Fields> = async data => {
    const token = await login(data)
    if (token) {
      localStorage.setItem('token', token)
      navigate('/')
    }
  }

  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Card variant="outlined" sx={{ py: '2rem' }}>
        <Box>
          <h1>TodoApp</h1>
        </Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Entrar
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <input
            {...register('email', validations.email)}
            type="email"
            placeholder="seu@email.com"
          />
          {errors.email && (
            <span style={{ color: 'white' }}>{errors.email.message}</span>
          )}
          <input
            type="password"
            {...register('password', { required: true })}
          />
          <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
          <Button type="submit" fullWidth variant="contained">
            Entrar
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Não tem uma conta?
          </Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <Link to="/cadastro">Inscrever-se</Link>
          </Typography>
        </Box>
      </Card>
    </Stack>
  )
}
