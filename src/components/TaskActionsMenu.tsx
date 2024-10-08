import React, { useState } from 'react'
import {
  Menu,
  Box,
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
  taskListId: number | undefined
}

export function TaskActionsMenu(props: TaskActionsMenuProps) {
  const {
    anchorEl,
    setAnchorEl,
    categories,
    taskId,
    taskDescription,
    taskTitle,
    taskListId,
  } = props
  const [listId, setListId] = useState<number | null | undefined>(taskListId)
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

  const handleKeyDown = (event: React.KeyboardEvent) => {}

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
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ p: 0, mt: 0 }}>
        <TextField
          id="outlined-basic"
          label="Título da tarefa"
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
            '& .MuiFormLabel-root': { fontSize: '1.1rem' },
          }}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>

      <Box sx={{ p: 0, mt: '10px' }}>
        <TextField
          id="outlined-multiline"
          label="Descrição"
          variant="outlined"
          multiline
          rows={1}
          fullWidth
          sx={{
            '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
            '& .MuiFormLabel-root': { fontSize: '1.1rem' },
          }}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>

      <Box sx={{ p: 0, mt: '10px' }}>
        <Autocomplete
          disablePortal
          options={[...categories, { id: null, name: 'Remover Categoria' }]}
          getOptionLabel={(option) => option.name}
          value={categories.find((category) => category.id === listId) || null}
          onKeyDown={handleKeyDown}
          onChange={(event, newValue) => {
            if (newValue) {
              setListId(newValue.id)
            } else {
              setListId(null)
            }
          }}
          onClose={(event, reason) => {
            if (reason === 'blur') {
              setListId(listId)
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
      </Box>

      <Box sx={{ p: 0, mt: '10px', mb: '30px' }}>
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
      </Box>

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
