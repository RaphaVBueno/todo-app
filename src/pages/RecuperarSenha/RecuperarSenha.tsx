import { Button, Typography, Box } from '@mui/material'
import Card from '@/components/Card'
import Input from '@/components/Input'
import { tokenGenerate } from '@/utils'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    await tokenGenerate(email)
    toast.success(
      'Se o e-mail informado estiver correto, você receberá nossa mensagem em instantes. Não se esqueça de verificar também sua caixa de spam.'
    )
  }

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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Enviar e-mail de redefinição de senha
        </Button>
      </Card>
    </Box>
  )
}

export default ResetPassword
