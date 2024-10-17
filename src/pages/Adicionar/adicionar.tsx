import { TextField, Grid, IconButton, Tooltip, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const columns = [
  { field: 'desk', headerName: 'Desk', width: 150 },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 1,
    minWidth: 100,
    align: 'center',
  },
  {
    field: 'actions',
    headerName: '',
    width: 150,
    renderCell: (params) => (
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
          <IconButton edge="end" aria-label="edit">
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
      </Box>
    ),
  },
]

const rows = [
  { id: 1, desk: 'Desk 1', quantity: 10 },
  { id: 2, desk: 'Desk 2', quantity: 20 },
]

function Adicionar() {
  return (
    <div style={{ paddingTop: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <TextField label="Input Esquerdo" variant="outlined" fullWidth />
          <div style={{ height: '80vh', marginTop: '20px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Input Direito" variant="outlined" fullWidth />
          <div style={{ height: '80vh', marginTop: '20px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Adicionar
