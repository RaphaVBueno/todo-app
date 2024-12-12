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
import { Role } from '@/types'

/**
 * A lista principal de itens de navegação para o menu lateral
 * Cada item contém um texto, um ícone e uma rota associada
 */
const mainListItems = [
  { text: 'Pagina Inicial', icon: <HomeRoundedIcon />, route: '/' },
  { text: 'Meu Perfil', icon: <PeopleRoundedIcon />, route: '/perfil' },
  {
    text: 'Gerenciar Tag e Categoria',
    icon: <AddCircleIcon />,
    route: '/adicionar',
  },
  {
    text: 'Lista de Perfis',
    icon: <PeopleRoundedIcon />,
    route: '/lista-perfil',
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    text: 'Lista de Perfis Admin',
    icon: <PeopleRoundedIcon />,
    route: '/lista-perfil-admin',
    roles: [Role.SUPERADMIN],
  },
]

/**
 * Componente que exibe o conteúdo do menu lateral com navegação entre páginas
 * e a opção de sair da aplicação
 *
 * @component
 * @returns {JSX.Element} O componente que renderiza o menu com itens de navegação e botão de logout
 */
export default function MenuContent() {
  const navigate = useNavigate() // Hook do React Router para navegação
  const location = useLocation() // Hook do React Router para obter a localização atual da página
  const { signOut, user } = useAuth() // Hook para autenticação, incluindo função de logout

  /**
   * Função que manipula a navegação entre as páginas
   *
   * @param {string} route A rota para a qual o usuário será redirecionado
   */
  const handleNavigation = (route: string) => {
    navigate(route)
  }

  if (!user) return null

  const items = mainListItems.filter(({ roles }) => {
    if (!roles) return true

    return roles.includes(user.role)
  })

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {items.map((item, index) => (
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
            {' '}
            {/* Chama a função de logout */}
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
