import {
  Avatar,
  Button,
  Grid2 as Grid,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material'
import { useAuth } from '@/hooks'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { Fields, passwordValidation, validations } from '../Cadastro/fields'
import { Input } from '@/components'
import { updateUser, UpdateUserParams } from '@/utils'

const UserProfile = () => {
  const { user } = useAuth()
  if (!user) return ''

  //fazer uma verificação para cada campo alterado e enviar na requisição só o que foi alterado

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Fields>()

  const passwordValue = useWatch({ control, name: 'password' })

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    console.log('chegou aqui')
    await updateUser(data as UpdateUserParams)
  }

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid>
            <Avatar
              alt="User Avatar"
              src="/avatar.jpg"
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid>
            <Typography variant="h5">{user?.username || 'Usuário'}</Typography>
          </Grid>
          <Grid>
            <Button variant="contained" color="primary">
              Adicionar Nova Foto
            </Button>
          </Grid>
        </Grid>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            {...register('name', validations.name)}
            label="Nome"
            error={errors.name?.message}
            defaultValue={user.name}
          />

          <Input
            {...register('username', validations.username)}
            label="Nome de usuário"
            error={errors.username?.message}
            defaultValue={user.username}
          />

          <Input
            {...register('email', validations.email)}
            label="Email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            defaultValue={user.email}
          />

          <Input
            {...register('birthDate', validations.birthDate)}
            label="Data de Nascimento"
            type="date"
            error={errors.birthDate?.message}
            defaultValue={user.birthDate.slice(0, 10)}
          />

          <Input
            {...register('password', validations.password)}
            label="Senha"
            type="password"
            error={errors.password?.message}
          />

          <Input
            {...register(
              'confirmPassword',
              passwordValidation(passwordValue).confirmPassword
            )}
            label=" Confirmar Senha"
            type="confirmPassword"
            error={errors.confirmPassword?.message}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Atualizar Informações
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserProfile
