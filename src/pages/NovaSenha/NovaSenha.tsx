import { Button, Box, Card, CardContent } from '@mui/material'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { Fields, passwordValidation, validations } from '../Cadastro/fields'
import { Input } from '@/components'
import { newPassword, NewPasswordParams, validateToken } from '@/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '@/components/Loading'
import toast from 'react-hot-toast'
import { useState } from 'react'
//navegar para tela de login após resetar senha
function NovaSenha() {
  const { token } = useParams()
  const [loginButton, setLoginButton] = useState(false)
  const navigate = useNavigate()

  const {
    isPending,
    error: validateError,
    data: userId,
  } = useQuery<number>({
    queryKey: ['newPassword'],
    queryFn: () => validateToken(token),
    enabled: !!token,
    retry: false,
  })

  const mutation = useMutation({
    mutationFn: (params: NewPasswordParams) => newPassword(params),
    onSuccess: () => {
      toast.success('Senha alterada com sucesso')
      setLoginButton(true)
    },
    onError: () => {
      toast.error('Ocorreu um erro')
    },
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Fields>()

  const passwordValue = useWatch({ control, name: 'password' })

  const onSubmit: SubmitHandler<any> = async (data) => {
    const { password } = data
    mutation.mutate({ id: userId, password, token })
  }

  if (validateError) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <p>Acesso Negado</p>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      {isPending ? (
        <Loading />
      ) : (
        <Card sx={{ maxWidth: 600, margin: 'auto' }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Input
                {...register('password', validations.password)}
                label="Nova Senha"
                type="password"
                error={errors.password?.message}
              />

              <Input
                {...register(
                  'confirmPassword',
                  passwordValidation(passwordValue).confirmPassword
                )}
                label=" Confirmar Nova Senha"
                type="password"
                error={errors.confirmPassword?.message}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  sx={{ marginTop: '2rem' }}
                >
                  Atualizar Senha
                </Button>
              </Box>
              {loginButton && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginTop: '2rem' }}
                    onClick={() => navigate('/login')}
                  >
                    Ir para Tela de Login
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default NovaSenha
