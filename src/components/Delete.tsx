import { 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Button 
  } from '@mui/material'
  
  type DeleteConfirmationDialogProps = {
    open: boolean
    onClose: () => void
    onConfirm: () => void
  }
  
  function DeleteDialog({
    open,
    onClose,
    onConfirm
  }: DeleteConfirmationDialogProps) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Deseja excluir?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta ação não poderá ser desfeita. Tem certeza que deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Não
          </Button>
          <Button onClick={onConfirm} color="secondary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  
  export default DeleteDialog
  