import {
  Avatar,
  Button,
  Grid2 as Grid,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import { useAuth } from '@/hooks'
import { Fields, validations } from '../Cadastro/fields'
import { useForm, useWatch } from 'react-hook-form'
import { Input } from '@/components'
import { useState } from 'react'

const UserProfile = () => {
  const { user } = useAuth()
  const [confirmPassWord, setConfirmPassWord] = useState('')
  const [password, setPassword] = useState('')
  //fazer uma verificação para cada campo alterado e enviar na requisição só o que foi alterado
  //fazer a verificação de senhas

  if (!user) return ''

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>()

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

        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 6 }}>
            <Input
              {...register('name', validations.name)}
              label="Nome"
              error={errors.name?.message}
              defaultValue={user.name}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Input
              {...register('username', validations.username)}
              label="Nome de usuário"
              error={errors.username?.message}
              defaultValue={user.username}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Input
              {...register('email', validations.email)}
              label="Email"
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              defaultValue={user.email}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Input
              {...register('birthDate', validations.birthDate)}
              label="Data de Nascimento"
              type="date"
              error={errors.birthDate?.message}
              defaultValue={user.birthDate.slice(0, 10)}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Input
              {...register('password', validations.password)}
              label="Senha"
              type="password"
              error={errors.password?.message}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Input
              label=" Confirmar Senha"
              type="Confirm password"
              error={errors.password?.message}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" mt={3}>
          <Button variant="contained" color="primary" size="large">
            Atualizar Informações
          </Button>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserProfile
