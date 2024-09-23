import React, { useState } from 'react'
import { IconButton, Tooltip, Box } from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { deleteTask, devUser, queryClient } from '../utils'
import { List } from '../types/list'
import { TaskActionsMenu } from './TaskActionsMenu'

type TaskActionsProps = {
  taskId: number
  categories: List[]
  taskDescription: string | undefined
  taskTitle: string
}

export default function TaskActions(props: TaskActionsProps) {
  const { taskId, categories, taskDescription, taskTitle } = props
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
      <TaskActionsMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        categories={categories}
        taskId={taskId}
        taskDescription={taskDescription}
        taskTitle={taskTitle}
      />
    </Box>
  )
}
