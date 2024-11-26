import { useNavigate, useLocation } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import LogoutIcon from '@mui/icons-material/Logout'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { useAuth } from '@/hooks'

const mainListItems = [
  { text: 'Pagina Inicial', icon: <HomeRoundedIcon />, route: '/' },
  { text: 'Meu Perfil', icon: <PeopleRoundedIcon />, route: '/perfil' },
  {
    text: 'Gerenciar Tag e Categoria',
    icon: <AddCircleIcon />,
    route: '/adicionar',
  },
  {
    text: 'Lista de Perfil',
    icon: <PeopleRoundedIcon />,
    route: '/lista-perfil',
  },
]

export default function MenuContent() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signOut } = useAuth()

  const handleNavigation = (route: string) => {
    navigate(route)
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => handleNavigation(item.route)}
              selected={location.pathname === item.route}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={() => signOut()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  )
}
