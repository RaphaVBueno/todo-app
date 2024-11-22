import React, { useState } from 'react'
import { IconButton, Tooltip, Box } from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { deleteTask, queryClient } from '../utils'
import { List } from '../types/list'
import { TaskActionsMenu } from './TaskActionsMenu'
import { Tag } from '../types/tag'
import DeleteDialog from './Delete'
import SnackbarMessage from './SnackbarMessage'

type TaskActionsProps = {
  taskId: number
  categories: List[]
  taskDescription: string | undefined
  taskTitle: string
  taskListId: number | undefined
  tags: Tag[]
  taskTagsId: Tag[]
}

export default function TaskActions(props: TaskActionsProps) {
  const {
    taskId,
    categories,
    taskDescription,
    taskTitle,
    taskListId,
    tags,
    taskTagsId,
  } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const [statusSuccess, setStatusSuccess] = useState(true)
  const [message, setMessage] = useState('')
  //rendeizar o snackbar um componente acima

  const { mutate } = useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setMessage('Tarefa Deletada')
      setStatusSuccess(true)
      setOpenMessage(true)
    },
    onError: () => {
      setMessage('Erro ao deletarr Tarefa'),
        setStatusSuccess(false),
        setOpenMessage(true)
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDelete = () => {
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    mutate()
    setOpenDeleteDialog(false)
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
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <TaskActionsMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        categories={categories}
        taskId={taskId}
        taskDescription={taskDescription}
        taskTitle={taskTitle}
        taskListId={taskListId}
        tags={tags}
        taskTagsId={taskTagsId}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
      />
      <SnackbarMessage
        openMessage={openMessage}
        statusSuccess={statusSuccess}
        message={message}
        setOpenMessage={setOpenMessage}
      />
    </Box>
  )
}
