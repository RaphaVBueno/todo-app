import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Typography, Stack, Alert } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Card, Input } from '@/components'
import { useAuth } from '@/hooks'

import { validations, Fields } from './fields'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>()

  const onSubmit: SubmitHandler<Fields> = async data => {
    try {
      await signIn(data)
      navigate('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        toast.error('Usuário ou senha incorretos. Tente novamente.')
      } else {
        toast.error('Algo deu errado. Tente novamente mais tarde.')
      }
    }
  }

  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Card variant="outlined" sx={{ py: '2rem' }}>
        {state?.result.success && (
          <Alert severity="success">{state?.result.message}</Alert>
        )}
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
