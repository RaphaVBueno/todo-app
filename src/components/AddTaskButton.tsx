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
import { DatePicker } from '@mui/x-date-pickers'

const Categorias = [
  { title: 'Tarefas de casa' },
  { title: 'Tarefas do trabalho' },
]

const Tag = [{ title: 'Urgente' }, { title: 'Nao sei' }]

function AddTaskButton(props: ButtonProps) {
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
              width: anchorEl?.clientWidth || 'auto', // Largura igual ao botão
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
            options={Categorias}
            getOptionLabel={(option) => option.title}
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
          <DatePicker
            value={dueDate}
            label={
              date == null
                ? null
                : format(date, 'dd MMM, yyyy', { locale: ptBR })
            }
            onChange={(newValue) => setDate(newValue)}
            slots={{ field: ButtonField }}
            slotProps={{
              field: { setOpen } as any,
              nextIconButton: { size: 'small' },
              previousIconButton: { size: 'small' },
            }}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default AddTaskButton
