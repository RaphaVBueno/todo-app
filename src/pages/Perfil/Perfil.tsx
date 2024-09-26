import { Avatar, Button, Grid, TextField, Typography, Card, CardContent } from '@mui/material';

const UserProfile = () => {
  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              alt="R"
              src="/avatar.jpg"
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">Rapha</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">Adicionar Nova Foto</Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="Nome" defaultValue="Raphael" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Nome do suário" defaultValue="Rapha" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Email" defaultValue="rapha@gmail.com" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
          <TextField
            fullWidth type="date" label="Data de Nascimento" variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="password" label="Senha" defaultValue="12345678" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="password" label="Confirmar Senha" defaultValue="12345678" variant="outlined" />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" mt={3}>
          <Button variant="contained" color="primary" size="large">Atualizar Informações</Button>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default UserProfile;
