import React from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'

type AddTaskButtonProps = {
  onClick: () => void
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: 16,
        left: 0,
        top: '93%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={onClick}
        sx={{
          //width: '25%', // para telas 720
          //height: '32px', // para telas 720
          width: '25%', // para telas de 1080
          height: '40px', // para telas de 1080
        }}
      >
        Adicionar tarefa
      </Button>
    </Box>
  )
}

export default AddTaskButton
