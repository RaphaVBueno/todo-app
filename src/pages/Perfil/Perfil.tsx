import {
  Avatar,
  Button,
  Grid2 as Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Alert,
} from '@mui/material'
import { useAuth } from '@/hooks'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { Fields, passwordValidation, validations } from '../Cadastro/fields'
import { Input } from '@/components'
import { updateUser, UpdateUserParams } from '@/utils'
import { useState } from 'react'
import toast from 'react-hot-toast'

const UserProfile = () => {
  const { user } = useAuth()
  if (!user) return ''

  const [message, setMessage] = useState('')
  const [openMessage, setOpenMessage] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Fields>()

  const passwordValue = useWatch({ control, name: 'password' })

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    const result = await updateUser(data as UpdateUserParams)

    if (result.success) {
      toast.success('Perfil atualizado com sucesso')
    } else {
      setOpenMessage(true)
      setMessage(result.message)
    }
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
          {openMessage && (
            <Alert sx={{ marginTop: '1rem' }} severity="error">
              {message}
            </Alert>
          )}
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
              Atualizar Informações
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserProfile
