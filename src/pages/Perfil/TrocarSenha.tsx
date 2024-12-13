import { Button, Box, Card, CardContent } from '@mui/material'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { Fields, passwordValidation, validations } from '../Cadastro/fields'
import { Input } from '@/components'
import { updateUser, UpdateUserParams } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function TrocarSenha() {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (params: UpdateUserParams) => updateUser(params),
    onSuccess: () => {
      toast.success('Senha alterada com sucesso')
      navigate('/perfil')
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
    mutation.mutate({ password })
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
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default TrocarSenha
