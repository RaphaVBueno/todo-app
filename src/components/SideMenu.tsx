import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MenuContent from './MenuContent'
import OptionsMenu from './OptionsMenu'
import { api, devUser } from '../utils'

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
  setFilter: Dispatch<SetStateAction<number | null>>
}

export default function SideMenu(props: SideMenuProps) {
  const { setFilter } = props
  const [list, setList] = useState([])
  const user = devUser

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const userResponse = await api.get(`/list/userList/${devUser}`)
        setList(userResponse.data.categories)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }
    fetchDados()
  }, [user])

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
            alt="Rapha"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: 'auto' }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: '16px' }}
            >
              Rapha
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              rapha@gmail.com
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Box>
      <Divider />
      <MenuContent list={list} setFilter={setFilter} />
    </Drawer>
  )
}
