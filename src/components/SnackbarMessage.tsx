import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

type SnackbarMessageProps = {
  openMessage: boolean
  statusSuccess: boolean
  message: string | null
  setOpenMessage: Dispatch<SetStateAction<boolean>>
}

function SnackbarMessage(props: SnackbarMessageProps) {
  const { openMessage, statusSuccess, message, setOpenMessage } = props

  const handleClose = (
    __event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenMessage(false)
  }

  return (
    <Snackbar
      open={openMessage}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={statusSuccess ? 'success' : 'error'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {' '}
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarMessage
