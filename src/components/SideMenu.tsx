import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MenuContent from './MenuContent'
import OptionsMenu from './OptionsMenu'
import { useEffect, useState } from 'react'
import api, { devUser } from '../api.utils'

const drawerWidth = 320

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
})

type SideMenuProps = {
  date: Date | null
}

export default function SideMenu(props: SideMenuProps) {
  const [list, setList] = useState()
  const { date } = props // não precisa de date aqui viajei

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const userResponse = await api.get(`/list/userList/${devUser}`)
        console.log('requiaão feita', userResponse.data.categories)
        setList(userResponse.data.categories)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }
    fetchDados()
  }, [date])

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: '60px',
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: '100%',
            p: 2,
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: 'auto' }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: '16px' }}
            >
              Riley Carter
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              riley@email.com
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Box>
      <Divider />
      <MenuContent />
    </Drawer>
  )
}
