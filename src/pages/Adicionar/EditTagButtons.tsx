import { IconButton, Tooltip, Box } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useState } from 'react'
import EditTagMenu from './EditTagMenu'

function EditTagButtons() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openMenu, setOpenMenu] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpenMenu(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: '16px',
        marginTop: '5px',
      }}
    >
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
        <IconButton edge="end" aria-label="delete" sx={{ ml: 2 }}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <EditTagMenu
        anchorEl={anchorEl}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
    </Box>
  )
}
export default EditTagButtons
