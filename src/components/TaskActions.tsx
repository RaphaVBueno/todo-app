import React, { useState } from 'react'
import {
  IconButton,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  TextField,
  Autocomplete,
} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { deleteTask, devUser, queryClient } from '../utils'

const Categorias = [
  { title: 'Tarefas de casa' },
  { title: 'Tarefas do trabalho' },
]

const Tag = [{ title: 'Urgente' }, { title: 'Nao sei' }]

type TaskActionsProps = {
  taskId: number
}

export default function TaskActions(props: TaskActionsProps) {
  const { taskId } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { mutate } = useMutation({
    mutationFn: () => deleteTask(devUser, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    mutate()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip
        title="Editar"
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -14],
                },
              },
            ],
          },
        }}
      >
        <IconButton edge="end" aria-label="edit" onClick={handleClick}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip
        title="Deletar"
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -14],
                },
              },
            ],
          },
        }}
      >
        <IconButton
          edge="end"
          aria-label="delete"
          sx={{ ml: 2 }}
          onClick={() => handleDelete()}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 380,
            height: 350,
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
          },
        }}
      >
        <MenuItem sx={{ p: 0, mt: 0 }}>
          <TextField
            id="outlined-basic"
            label="Título da tarefa"
            variant="outlined"
            fullWidth
          />
        </MenuItem>
        <MenuItem sx={{ p: 0, mt: '10px' }}>
          <TextField
            id="outlined-multiline"
            label="Descrição"
            variant="outlined"
            multiline
            rows={1}
            fullWidth
          />
        </MenuItem>
        <MenuItem sx={{ p: 0, mt: '10px' }}>
          <Autocomplete
            disablePortal
            options={Categorias}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="Categoria" />
            )}
            fullWidth
          />
        </MenuItem>
        <MenuItem sx={{ p: 0, mt: '10px' }}>
          <Autocomplete
            disablePortal
            options={Tag}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label="Tag" />}
            fullWidth
          />
        </MenuItem>
      </Menu>
    </Box>
  )
}
