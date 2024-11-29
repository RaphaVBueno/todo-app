import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { Usuario } from '@/types'
import { getUserLista } from '@/utils'
import { useState } from 'react'
import DeleteConfirmationDialog from '../../components/Delete'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '@/utils'

function ListaPerfil() {
  const { error: listUserError, data: users } = useQuery<Usuario[]>({
    queryKey: ['usersList'],
    queryFn: () => getUserLista(),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userList'] })
    },
    onError: (error) => {
      console.error('Erro ao deletar usuário:', error)
    },
  })

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

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

  if (listUserError) return 'Erro ao carregar usuários'

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '80vh',
          paddingTop: '16px',
          paddingRight: '16px',
          paddingLeft: '16px',
          bgcolor: 'background.paper',
          borderRadius: 2,
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
        <List>
          {users?.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
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
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              }
              disablePadding
              sx={{ mb: '12px' }}
            >
              <ListItemButton role={undefined} dense>
                <ListItemText primary={user.username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <DeleteConfirmationDialog
        open={confirmOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  )
}

export default ListaPerfil
