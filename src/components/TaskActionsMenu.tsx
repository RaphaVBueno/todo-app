import React, { useState } from 'react'
import {
  Menu,
  MenuItem,
  TextField,
  Autocomplete,
  Button,
  Stack,
} from '@mui/material'
import { List } from '../types/list'
import { devUser, queryClient, updateTask, updateTaskParams } from '../utils'
import { useMutation } from '@tanstack/react-query'

type TaskActionsMenuProps = {
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  categories: List[]
  taskId: number
  taskDescription: string | undefined
  taskTitle: string
}

export function TaskActionsMenu(props: TaskActionsMenuProps) {
  const {
    anchorEl,
    setAnchorEl,
    categories,
    taskId,
    taskDescription,
    taskTitle,
  } = props
  const [listId, setListId] = useState<number | null>(null)
  const [title, setTitle] = useState<string | null>(taskTitle)
  const [description, setDescription] = useState<string | null>(
    taskDescription ? taskDescription : null
  )
  const [tagId, setTagId] = useState<number | null>(null)
  const { mutate } = useMutation({
    mutationFn: (params: updateTaskParams) => updateTask(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleSubmit = () => {
    mutate({ taskId, title, description, listId, tagId, userId: devUser })
    handleClose()
  }

  const Tag = [{ title: 'Urgente' }, { title: 'Nao sei' }]

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    //gambiarra para lidar com o o bug dos inputs
    const forbiddenKeys = ['d', 't', 'c']
    if (forbiddenKeys.includes(event.key.toLowerCase())) {
      event.stopPropagation()
    }
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      onKeyDown={handleKeyDown}
      PaperProps={{
        style: {
          width: 400,
          height: 360,
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
        },
      }}
    >
      <MenuItem sx={{ p: 0, mt: 0 }}>
        <TextField
          id="outlined-basic"
          label="Título da tarefa"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
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
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </MenuItem>

      <MenuItem sx={{ p: 0, mt: '10px' }}>
        <Autocomplete
          disablePortal
          options={categories}
          getOptionLabel={(option) => option.name}
          onKeyDown={handleKeyDown}
          onChange={(event, newValue) => {
            if (newValue) {
              setListId(newValue.id)
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categoria"
              sx={{
                '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
                '& .MuiFormLabel-root': { fontSize: '1.1rem' },
              }}
            />
          )}
          fullWidth
        />
      </MenuItem>

      <MenuItem sx={{ p: 0, mt: '10px', mb: '30px' }}>
        <Autocomplete
          disablePortal
          options={Tag}
          getOptionLabel={(option) => option.title}
          onKeyDown={handleKeyDown}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tag"
              sx={{
                '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
                '& .MuiFormLabel-root': { fontSize: '1.1rem' },
              }}
            />
          )}
          fullWidth
        />
      </MenuItem>

      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        sx={{ mt: '45px' }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
          sx={{ height: '40px', width: '130px', fontSize: '1rem' }}
        >
          Confirmar
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}
          sx={{ height: '40px', width: '130px', fontSize: '1rem' }}
        >
          Cancelar
        </Button>
      </Stack>
    </Menu>
  )
}
