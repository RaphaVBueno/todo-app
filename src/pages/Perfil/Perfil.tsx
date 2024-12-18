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
import { SubmitHandler, useForm } from 'react-hook-form'
import { Fields, validations } from '../Cadastro/fields'
import { Input } from '@/components'
import { updateUser, UpdateUserParams } from '@/utils'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  if (!user) return ''

  const [message, setMessage] = useState('')
  const [openMessage, setOpenMessage] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>()

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
              src={`http://localhost:3000/static/perfilImage_${user.username}.jpg`}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid>
            <Typography variant="h5">{user?.username || 'Usuário'}</Typography>
          </Grid>
          <Grid>
            {/* <Button variant="contained" color="primary">
              Adicionar Nova Foto
            </Button> */}
            <input type="file" accept="image/*" />
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
              onClick={() => navigate('/trocar-senha')}
              sx={{ marginTop: '2rem' }}
            >
              Alterar senha
            </Button>
          </Box>
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
