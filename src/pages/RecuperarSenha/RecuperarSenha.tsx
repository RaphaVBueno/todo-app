import { Button, Typography, Box } from '@mui/material'
import Card from '@/components/Card'
import Input from '@/components/Input'

const ResetPassword = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Redefinir sua senha
        </Typography>
        <Input
          label="Insira seu endereço de e-mail"
          name="email"
          type="email"
          fullWidth
          required
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Enviar e-mail de redefinição de senha
        </Button>
      </Card>
    </Box>
  )
}

export default ResetPassword
