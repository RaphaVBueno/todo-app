import { useNavigate, useLocation } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import LogoutIcon from '@mui/icons-material/Logout'

const mainListItems = [
  { text: 'Pagina Inicial', icon: <HomeRoundedIcon />, route: '/' },
  { text: 'Meu Perfil', icon: <PeopleRoundedIcon />, route: '/perfil' },
  { text: 'Configurações', icon: <SettingsRoundedIcon />, route: '/configuracoes' },
  { text: 'Sair', icon: <LogoutIcon />, route: '/login' },
]

export default function MenuContent() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (route) => {
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
      </List>
    </Stack>
  )
}
