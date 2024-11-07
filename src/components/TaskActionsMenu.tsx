import React, { useState } from 'react'
import { Menu, Stack } from '@mui/material'
import { List } from '../types/list'
import { devUser, queryClient, updateTask, updateTaskParams } from '../utils'
import { useMutation } from '@tanstack/react-query'
import BotaoPadrao from './BotaoPadrao'
import AutoCompleteTaskActions from './AutoCompleteTaskActions'
import Input from './Input'
import { Tag } from '../types/tag'
import MultiSelect from './MultiSelect'

type TaskActionsMenuProps = {
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  categories: List[]
  taskId: number
  taskDescription: string | undefined
  taskTitle: string
  taskListId: number | undefined
  tags: Tag[]
  taskTagsId: Tag[]
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
    taskTagsId,
  } = props
  const [listId, setListId] = useState<number | null | undefined>(taskListId)
  const [title, setTitle] = useState<string>(taskTitle)
  const [description, setDescription] = useState<string>(
    taskDescription ? taskDescription : ''
  )
  const [tagId, setTagId] = useState<number[]>([])
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
      <Input
        onChange={(e) => setTitle(e.target.value)}
        label="Título da tarefa"
        value={title}
        style={{ marginTop: '-10px' }}
      />
      <Input
        onChange={(e) => setDescription(e.target.value)}
        label="Descrição"
        value={description}
        style={{ marginTop: '-10px' }}
      />

      <AutoCompleteTaskActions
        categories={categories}
        setListId={setListId}
        listId={listId}
      />
      <MultiSelect
        categories={categories}
        tags={tags}
        setTagId={setTagId}
        taskTagsId={taskTagsId}
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
