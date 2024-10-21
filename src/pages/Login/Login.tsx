import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Typography, Stack } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Card, Input } from '@/components'
import { login } from '@/utils'

import { validations, Fields } from './fields'

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
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Entrar
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Entre as suas informações de login abaixo.
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
          <Input
            {...register('email', validations.email)}
            label="Email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
          />
          <Input
            {...register('password', validations.password)}
            label="Senha"
            type="password"
            error={errors.password?.message}
          />
          <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
          <Button sx={{ my: 3 }} type="submit" fullWidth variant="contained">
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
