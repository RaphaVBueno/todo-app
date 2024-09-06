import { Button, ButtonProps } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'

function AddTaskButton(props: ButtonProps) {
  const { onClick } = props

  return (
    <Box sx={{ maxWidth: { md: '35%' }, mb: 4 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onClick}
        fullWidth
      >
        Adicionar tarefa
      </Button>
    </Box>
  )
}

export default AddTaskButton
