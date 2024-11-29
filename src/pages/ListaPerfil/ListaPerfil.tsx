import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { Usuario } from '@/types'
import { getUserLista } from '@/utils'

function ListaPerfil() {
  const { error: listUserError, data: users } = useQuery<Usuario[]>({
    queryKey: ['usersList'],
    queryFn: () => getUserLista(),
  })

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
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
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
    </Box>
  )
}

export default ListaPerfil
