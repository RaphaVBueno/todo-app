import React, { useState } from 'react'
import { Menu, Stack } from '@mui/material'
import { List } from '../types/list'
import { devUser, queryClient, updateTask, updateTaskParams } from '../utils'
import { useMutation } from '@tanstack/react-query'
import BotaoPadrao from './BotaoPadrao'
import AutoCompleteTaskActions from './AutoCompleteTaskActions'
import InputPadrao from './InputPadrao'
import { Tag } from '../types/tag'

type TaskActionsMenuProps = {
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  categories: List[]
  taskId: number
  taskDescription: string | undefined
  taskTitle: string
  taskListId: number | undefined
  tags: Tag[]
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
    tags,
  } = props
  const [listId, setListId] = useState<number | null | undefined>(taskListId)
  const [title, setTitle] = useState<string>(taskTitle)
  const [description, setDescription] = useState<string>(
    taskDescription ? taskDescription : ''
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

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
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
      <InputPadrao
        action={setTitle}
        inputName="Título da tarefa"
        value={title}
      />
      <InputPadrao
        action={setDescription}
        inputName="Descrição"
        value={description}
      />

      <AutoCompleteTaskActions
        categories={categories}
        setListId={setListId}
        listId={listId}
        tags={tags}
        tagId={tagId}
        setTagId={setTagId}
      />

      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        sx={{ mt: '45px' }}
      >
        <BotaoPadrao action={handleSubmit} buttonName="Confirmar" />
        <BotaoPadrao action={handleClose} buttonName="Cancelar" />
      </Stack>
    </Menu>
  )
}
