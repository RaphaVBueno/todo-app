import { useState } from 'react'
import { Button, Dialog, Box, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ptBR } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { List, Tag } from '@/types'
import { addTask, devUser, queryClient, AddTaskParams } from '@/utils'
import BotaoPadrao from '@/components/BotaoPadrao'
import Input from '@/components/Input'

import AutoCompleteAddTask from './AutoCompleteAddTask'
import MultiSelect from '@/components/MultiSelect'

type AddTaskButtonProps = {
  categories: List[]
  tags: Tag[]
}

function AddTaskButton(props: AddTaskButtonProps) {
  const { categories, tags } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const isMenuOpen = Boolean(anchorEl)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [listId, setListId] = useState<number | null>(null)
  const [tagId, SetTagId] = useState<number[]>([])

  const { mutate } = useMutation({
    mutationFn: (params: AddTaskParams) => addTask(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      toast.success('Tarefa adicionada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao adicionar a tarefa!')
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setTitle('')
    setDueDate(null)
    setDescription('')
    setListId(null)
    SetTagId([])
  }

  const handleSubmit = () => {
    mutate({ title, dueDate, userId: devUser, description, listId, tagId })
    handleClose()
    setTitle('')
    setDueDate(null)
    setDescription('')
    setListId(null)
    SetTagId([])
  }

  return (
    <Box
      sx={{
        position: 'fixed', // Fixe o botão na tela
        top: '95%', // Posicione a partir do centro da tela
        left: '50%', // Centralize horizontalmente
        transform: 'translate(-50%, -50%)', // Ajuste para realmente centralizar
        zIndex: 9999, // Garantir que o botão fique na frente
        width: "480px"
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        fullWidth
      >
        Adicionar tarefa
      </Button>
      <Dialog
        open={isMenuOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "480px",
            height: "710px",
            display: 'flex',
            flexDirection: 'column',
            padding: "20px",
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'transparent', // Remove o fundo escuro
          },
        }}
      >
        <Box sx={{ p: 0, mt: '0px' }}>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            label="Título da tarefa"
            value={title}
            style={{ marginTop: '-8px' }}
          />
        </Box>
        <Box sx={{ p: 0, mt: '4px' }}>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            label="Descrição"
            value={description}
            style={{ marginTop: '-8px', height: '80px' }}
            multiline
            rows={3}
          />
        </Box>
        <AutoCompleteAddTask categories={categories} setListId={setListId} />
        <MultiSelect tags={tags} setTagId={SetTagId} taskTagsId={[]} />
        <Box>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DateCalendar
              value={dueDate}
              onChange={setDueDate}
              sx={{
                width: '80%',
                '& .MuiPickersArrowSwitcher-root': {
                  justifyContent: 'space-between',
                  '& button': { mr: '11px' },
                },
                '& .MuiTypography-root': {
                  fontSize: '1.1rem',
                  margin: '0px 5px',
                },
                '& .MuiPickersCalendarHeader-label': { fontSize: '1.2rem' },
                '& .MuiPickersDay-root': {
                  fontSize: '1.1rem',
                  margin: '4px 5px',
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        <Stack
          direction="row"
          spacing={"46px"}
          justifyContent="center"
        >
          <BotaoPadrao action={handleClose} buttonName="Cancelar" />
          <BotaoPadrao action={handleSubmit} buttonName="Adicionar" />
        </Stack>
      </Dialog>
    </Box >
  )
}

export default AddTaskButton
