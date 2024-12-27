import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import DeleteConfirmationDialog from '../../components/Delete'
import { Usuario } from '@/types'
import { getUserLista, deleteUser, updateUserRole } from '@/utils'
import EditDialog from './EditDialog'
import { columns } from './GridConfig'

function ListaPerfilAdm() {
  const { error: listUserError, data: users } = useQuery<Usuario[]>({
    queryKey: ['usersList'],
    queryFn: () => getUserLista(),
  })

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersList'] })
    },
    onError: (error) => {
      console.error('Erro ao deletar usuário:', error)
    },
  })

  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, newRole }: { userId: number; newRole: string }) =>
      updateUserRole({ userId, newRole }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersList'] })
    },
    onError: (error) => {
      console.error('Erro ao atualizar papel do usuário:', error)
    },
  })

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [usersRole, setUsersRole] = useState('')
  const [openMenu, setOpenMenu] = useState(false)

  const handleDeleteClick = (userId: number) => {
    setSelectedUserId(userId)
    setConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      deleteMutation.mutate(selectedUserId)
    }
    setConfirmOpen(false)
  }

  const handleCloseDialog = () => {
    setConfirmOpen(false)
  }

  const handleEditClick = (
    event: React.MouseEvent<HTMLElement>,
    user: Usuario
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedUserId(user.id)
    setUsersRole(user.role)
    setOpenMenu(true)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setSelectedUserId(null)
    setUsersRole('')
    setOpenMenu(false)
  }

  const handleRoleChange = (newRole: string) => {
    if (selectedUserId) {
      updateRoleMutation.mutate({ userId: selectedUserId, newRole })
    }
    handleCloseMenu()
  }

  if (listUserError) return 'Erro ao carregar usuários'

  const rows =
    users?.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role,
      onEditClick: (event: React.MouseEvent<HTMLElement>) => handleEditClick(event, user),
      onDeleteClick: () => handleDeleteClick(user.id),
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
        <DataGrid rows={rows} columns={columns(handleEditClick, handleDeleteClick)} hideFooter />
      </Box>

      <EditDialog
        open={openMenu}
        onClose={handleCloseMenu}
        onSave={handleRoleChange}
        usersRole={usersRole}
        setUsersRole={setUsersRole}
      />

      <DeleteConfirmationDialog
        open={confirmOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  )
}

export default ListaPerfilAdm
