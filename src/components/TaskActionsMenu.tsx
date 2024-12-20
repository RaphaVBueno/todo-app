import React, { useState } from 'react'
import { Dialog, Stack } from '@mui/material'
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
  const [description, setDescription] = useState<string>(taskDescription ? taskDescription : '')
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
    <Dialog
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: '480px',
          height: '388px',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: 'transparent', // Remove o fundo escuro
        },
      }}
    >
      <Stack spacing={'4px'}>
        <Input
          style={{ marginTop: '-8px' }}
          onChange={(e) => setTitle(e.target.value)}
          label="Título da tarefa"
          value={title}
        />
        <Input
          onChange={(e) => setDescription(e.target.value)}
          label="Descrição"
          value={description}
          style={{ marginTop: '-8px', height: '80px' }}
          multiline
          rows={3}
        />
        <AutoCompleteTaskActions
          categories={categories}
          setListId={setListId}
          listId={listId}
        />
        <MultiSelect tags={tags} setTagId={setTagId} taskTagsId={taskTagsId} />
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        sx={{ mt: '16px' }}
      >
        <BotaoPadrao action={handleClose} buttonName="Cancelar" />
        <BotaoPadrao action={handleSubmit} buttonName="Confirmar" />
      </Stack>
    </Dialog>
  )
}
