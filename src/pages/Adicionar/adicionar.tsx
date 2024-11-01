import { useState } from 'react'
import { Grid, Box, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditarMenu from './menuEditar'
import Input from '../../components/Input'
import colunaCategoria from './colunaCategoria'
import colunaTag from './colunaTag'

const rows = [
  { id: 1, título: 'Trabalho', quantidade: 10, cor: 'Azul' },
  { id: 2, título: 'Escola', quantidade: 20, cor: 'Vermelho' },
]

function Adicionar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [color, setColor] = useState('#7e7e7e')
  const [editColor, setEditColor] = useState(color)
  const [isEditingTag, setIsEditingTag] = useState(false)

  const handleMenuOpen = (event, isTag) => {
    setAnchorEl(event.currentTarget)
    setIsEditingTag(isTag)
    if (!isTag) {
      setEditColor(color)
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}></Grid>

        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ marginBottom: '-10px', display: 'block' }}>
                Adicionar Categoria
              </label>
              <Input name="categoria" required fullWidth />
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginLeft: '16px',
                marginTop: '20px',
                width: '100px',
                height: '38px',
              }}
            >
              Salvar
            </Button>
          </Box>

          <div style={{ height: '80vh', marginTop: '20px' }}>
            <DataGrid
              rows={rows}
              columns={colunaCategoria(handleMenuOpen)}
              hideFooter
            />
          </div>
        </Grid>

        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ marginBottom: '-10px', display: 'block' }}>
                Adicionar Tag
              </label>
              <Input name="tag" required fullWidth />
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginLeft: '16px',
                marginTop: '20px',
                width: '100px',
                height: '38px',
              }}
            >
              Salvar
            </Button>
          </Box>

          <div style={{ height: '80vh', marginTop: '20px' }}>
            <DataGrid
              rows={rows}
              columns={colunaTag(handleMenuOpen)}
              hideFooter
            />
          </div>
        </Grid>
      </Grid>

      <EditarMenu
        anchorEl={anchorEl}
        open={open}
        isEditingTag={isEditingTag}
        editColor={editColor}
        setEditColor={setEditColor}
        handleClose={handleMenuClose}
      />
    </div>
  )
}

export default Adicionar
