import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  Button,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import DeleteConfirmationDialog from '../../components/Delete'
import BotaoPadrao from '@/components/BotaoPadrao'
import { Usuario } from '@/types'
import { getUserLista, deleteUser } from '@/utils'
import AutoCompletePerfil from './AutoCompletePerfil'

function ListaPerfilAdm() {
  const { error: listUserError, data: users } = useQuery<Usuario[]>({
    queryKey: ['usersList'],
    queryFn: () => getUserLista(),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersList'] })
    },
    onError: (error) => {
      console.error('Erro ao deletar usuário:', error)
    },
  })

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [usersRole, setUsersRole] = useState('')

  const handleDeleteClick = (userId: number) => {
    setSelectedUserId(userId)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      mutation.mutate(selectedUserId)
    }
    setConfirmOpen(false)
  }

  const handleCloseDialog = () => {
    setConfirmOpen(false)
  }

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleSubmit = () => {
    console.log('Salvar clicado')
  }

  if (listUserError) return 'Erro ao carregar usuários'

  const openMenu = Boolean(anchorEl)

  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: 'Nome do Usuário',
      width: 220,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: 'role',
      headerName: 'Papéis',
      width: 180,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            <IconButton
              edge="start"
              aria-label="edit"
              onClick={handleEditClick}
              sx={{ mt: '5px' }}
            >
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
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteClick(params.row.id)}
              sx={{ ml: '4px', mr: '0px', mt: '5px' }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  const rows =
    users?.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
    })) || []

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: '20px',
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{ mb: '16px', mt: '4px', textAlign: 'center' }}
      >
        Lista de Usuários
      </Typography>

      <Box
        sx={{
          height: 400,
          width: '75vh',
        }}
      >
        <DataGrid rows={rows} columns={columns} hideFooter />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
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
        <Box>
          Editar
          <Box sx={{ p: 0, mt: '4px', mb: '4px' }}>
            <AutoCompletePerfil userRole={usersRole} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            sx={{
              height: '40px',
              width: '130px',
              fontSize: '1rem',
              marginRight: 2,
            }}
          >
            Salvar
          </Button>
          <BotaoPadrao buttonName="Cancelar" action={handleCloseMenu} />
        </Box>
      </Menu>

      <DeleteConfirmationDialog
        open={confirmOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  )
}

export default ListaPerfilAdm
