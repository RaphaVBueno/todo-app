import React, { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Menu, MenuItem, TextField, Autocomplete } from '@mui/material'
import { List } from '../types/list'

type TaskActionsMenuProps = {
  anchorEl: HTMLElement | null
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>
  categories: List[]
}

export function TaskActionsMenu(props: TaskActionsMenuProps) {
  const { anchorEl, setAnchorEl, categories } = props

  const Tag = [{ title: 'Urgente' }, { title: 'Nao sei' }]

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
          width: 380,
          height: 350,
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
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
          rows={1}
          fullWidth
        />
      </MenuItem>
      <MenuItem sx={{ p: 0, mt: '10px' }}>
        <Autocomplete
          disablePortal
          options={categories}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Categoria" />}
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
    </Menu>
  )
}
