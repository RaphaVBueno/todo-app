import { Menu, Box, Button } from '@mui/material'
import Input from '../../components/Input'

function EditarMenu({
  anchorEl,
  open,
  isEditingTag,
  editColor,
  setEditColor,
  handleClose,
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: '400px',
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
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          <label style={{ marginBottom: '-10px', display: 'block' }}>
            Editar
          </label>
          <Input
            name="editar"
            required
            onChange={(e) => {}}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </Box>

        {!isEditingTag && (
          <>
            <input
              type="color"
              name="editColorInput"
              id="edit-color-input"
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <div
              style={{ width: 40, height: 40, backgroundColor: editColor }}
            />
          </>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            sx={{
              height: '40px',
              width: '130px',
              fontSize: '1rem',
              marginRight: 2,
            }}
          >
            Salvar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            sx={{ height: '40px', width: '130px', fontSize: '1rem' }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Menu>
  )
}

export default EditarMenu
