import type { Dispatch, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import BotaoPadrao from './BotaoPadrao'
import { useNavigate } from 'react-router-dom'

/**
 * Parâmetros para o componente `ErrorMessage`
 */
type ErrorMessageParams = {
  /** Mensagem de erro ou sucesso a ser exibida no modal. */
  message: string | null
  /** Define se o modal está aberto ou fechado. */
  openMessage: boolean
  /** Função para alterar o estado de exibição do modal. */
  setOpenMessage: Dispatch<SetStateAction<boolean>>
  /** Define se o modal representa uma operação bem-sucedida (opcional). */
  sucess?: boolean
}

/**
 * Componente que exibe uma mensagem de erro ou sucesso em um modal
 *
 * - Se a propriedade `sucess` for verdadeira, o título será "Sucesso", caso contrário, será "Algo deu Errado"
 * - Exibe uma mensagem e permite realizar ações como fechar o modal ou redirecionar para a página de login
 *
 * @param {ErrorMessageParams} props - Propriedades do componente
 * @returns O componente `ErrorMessage`
 */
function ErrorMessage(props: ErrorMessageParams) {
  const { message, openMessage, setOpenMessage, sucess } = props
  const navigate = useNavigate()

  /** Estilo aplicado à caixa principal do modal */
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

  /**
   * Fecha o modal de mensagem
   */
  const handleClose = () => setOpenMessage(false)

  /**
   * Redireciona o usuário para a página de login
   */
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
