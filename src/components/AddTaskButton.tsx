import { useState } from 'react'
import {
  Button,
  Menu,
  MenuItem,
  Box,
  TextField,
  Autocomplete,
  Stack,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ptBR } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { List } from '../types/list'
import { addTask, devUser, queryClient } from '../utils'
import { useMutation } from '@tanstack/react-query'

type AddTaskButtonProps = {
  categories: List[]
}

const Tag = [{ title: 'Urgente' }, { title: 'Nao sei' }]

function AddTaskButton(props: AddTaskButtonProps) {
  const { categories } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const isMenuOpen = Boolean(anchorEl)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string | null>(null)
  const { mutate } = useMutation({
    mutationFn: ({
      title,
      dueDate,
      userId,
    }: {
      title: string
      dueDate: Date | null
      userId: number
    }) => addTask(title, dueDate, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleSubmit = () => {
    mutate({ title, dueDate, userId: devUser })
    handleClose()
    setTitle('')
    setDueDate(null)
    setDescription(null)
  }

  return (
    <Box sx={{ maxWidth: { md: '50%' }, mb: 4 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        fullWidth
      >
        Adicionar tarefa
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              height: '680px',
              width: anchorEl?.clientWidth || 'auto',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
            },
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
            sx={{
              '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
              '& .MuiFormLabel-root': { fontSize: '1.1rem' },
            }}
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
            sx={{
              '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
              '& .MuiFormLabel-root': { fontSize: '1.1rem' },
            }}
          />
        </MenuItem>
        <MenuItem sx={{ p: 0, mt: '10px' }}>
          <Autocomplete
            disablePortal
            options={categories}
            fullWidth
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categoria"
                sx={{
                  '& .MuiInputBase-root': {
                    height: '44px',
                    fontSize: '1.1rem',
                  },
                  '& .MuiFormLabel-root': { fontSize: '1.1rem' },
                }}
              />
            )}
          />
        </MenuItem>
        <MenuItem sx={{ p: 0, mt: '10px', mb: '30px' }}>
          <Autocomplete
            disablePortal
            fullWidth
            options={Tag}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tag"
                sx={{
                  '& .MuiInputBase-root': {
                    height: '44px',
                    fontSize: '1.1rem',
                  },
                  '& .MuiFormLabel-root': { fontSize: '1.1rem' },
                }}
              />
            )}
          />
        </MenuItem>
        <MenuItem>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DateCalendar
              value={dueDate}
              onChange={setDueDate}
              sx={{
                width: '335px',
                '& .MuiPickersArrowSwitcher-root': {
                  justifyContent: 'space-between',
                  '& button': { ml: '4px' },
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
        </MenuItem>
        <Stack
          direction="row"
          spacing={5}
          justifyContent="center"
          sx={{ mt: '17px' }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            sx={{ height: '40px', width: '130px', fontSize: '1rem' }}
          >
            Cancelar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            sx={{ height: '40px', width: '130px', fontSize: '1rem' }}
          >
            Salvar
          </Button>
        </Stack>
      </Menu>
    </Box>
  )
}

export default AddTaskButton
