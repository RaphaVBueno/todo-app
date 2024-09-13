import { useState } from 'react'
import {
  Button,
  ButtonProps,
  Menu,
  MenuItem,
  Box,
  TextField,
  Autocomplete,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import * as React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import type { List } from '../types/list'

const Tag = [{ title: 'Urgente' }, { title: 'Nao sei' }]

type AddTaskButtonProps = {
  categories: List[]
}

function AddTaskButton(props: AddTaskButtonProps) {
  const { categories } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const [dueDate, setDueDate] = useState<Date | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ maxWidth: { md: '40%' }, mb: 4 }}>
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
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              height: '600px',
              width: anchorEl?.clientWidth || 'auto',
              padding: '16px',
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
          />
        </MenuItem>
        <MenuItem sx={{ p: 0, mt: '10px' }}>
          <TextField
            id="outlined-multiline"
            label="Descrição"
            variant="outlined"
            multiline
            rows={1} // Nao consegui deixar com 4 linhas esta bugado
            fullWidth
          />
        </MenuItem>
        <MenuItem sx={{ p: 0, mt: '10px' }}>
          <Autocomplete
            disablePortal
            options={categories}
            getOptionLabel={(option) => option.name}
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
        <MenuItem>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              value={dueDate}
              label={
                dueDate == null
                  ? null
                  : format(dueDate, 'dd MMM, yyyy', { locale: ptBR })
              }
              onChange={(newValue) => setDueDate(newValue)}
              open={true}
            />
          </LocalizationProvider>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default AddTaskButton
