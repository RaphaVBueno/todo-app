import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import { api } from '../../utils'

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    birthDate: '',
    password: '',
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user/1')
        setUser({
          name: response.data.user.name,
          username: response.data.user.username,
          email: response.data.user.email,
          birthDate: response.data.user.birthDate.slice(0, 10),
          password: response.data.user.password,
        })
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              alt="User Avatar"
              src="/avatar.jpg"
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">{user.username || 'Usuário'}</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Adicionar Nova Foto
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nome"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nome de Usuário"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Data de Nascimento"
              value={user.birthDate}
              onChange={(e) => setUser({ ...user, birthDate: e.target.value })}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              label="Senha"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="password"
              label="Confirmar Senha"
              variant="outlined"
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
