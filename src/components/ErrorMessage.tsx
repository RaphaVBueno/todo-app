import type { Dispatch, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import BotaoPadrao from './BotaoPadrao'
import { useNavigate } from 'react-router-dom'

type ErrorMessageParams = {
  message: string | null
  openMessage: boolean
  setOpenMessage: Dispatch<SetStateAction<boolean>>
  sucess?: boolean
}
//criar um botão para a pagina de login quando der sucesso
function ErrorMessage(props: ErrorMessageParams) {
  const { message, openMessage, setOpenMessage, sucess } = props
  const navigate = useNavigate()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const handleClose = () => setOpenMessage(false)
  const goToLoging = () => navigate('/login')

  return (
    <div>
      <Modal
        open={openMessage}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {sucess ? 'Sucesso' : 'Algo deu Errado'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
          <Box
            sx={{
              marginTop: '3rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <BotaoPadrao buttonName="Fechar" action={handleClose} />
            {sucess && (
              <BotaoPadrao buttonName="Fazer Login" action={goToLoging} />
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ErrorMessage
