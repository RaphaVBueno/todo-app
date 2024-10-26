import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import { useAuth } from '@/hooks'

const UserProfile = () => {
  const { user } = useAuth()

  if (!user) return ''

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
            <Typography variant="h5">{user?.username || 'Usuário'}</Typography>
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
              defaultValue={user?.name}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nome de Usuário"
              defaultValue={user?.username}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              defaultValue={user?.email}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Data de Nascimento"
              defaultValue={user?.birthDate.slice(0, 10)}
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
