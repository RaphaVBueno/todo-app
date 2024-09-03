import { useState, useEffect } from 'react'
import {
  PaletteMode,
  createTheme,
  ThemeProvider,
  alpha,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import getDashboardTheme from './theme/getDashboardTheme'
import AppNavbar from './components/AppNavbar'
import Header from './components/Header'
// import MainGrid from './components/MainGrid'
import SideMenu from './components/SideMenu'
import TemplateFrame from './TemplateFrame'
import api, { devUser } from './api.utils'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [checked, setChecked] = useState([])
  const [mode, setMode] = useState<PaletteMode>('light')
  const [showCustomTheme, setShowCustomTheme] = useState(true)
  const [date, setDate] = useState<Date | null>(new Date())
  const dashboardTheme = createTheme(getDashboardTheme(mode))
  const defaultTheme = createTheme({ palette: { mode } })

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null
    if (savedMode) {
      setMode(savedMode)
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      setMode(systemPrefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const userResponse = await api.get('/tasks', {
          params: {
            userId: devUser,
            date: date,
          },
        })
        console.log('requisição feita para task', userResponse.data.tasks)
        setTasks(userResponse.data.tasks)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }
    fetchDados()
  }, [date])

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)
  }

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev)
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>
          <SideMenu date={date} />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            })}
          >
            <Stack
              spacing={8}
              sx={{
                alignItems: 'center',
                mx: 4,
                pb: 10,
                mt: { xs: 10, md: 0 },
              }}
            >
              <Header date={date} setDate={setDate} />
              <List
                sx={{
                  width: '90%',
                  maxWidth: 1920,
                  bgcolor: 'background.paper',
                  borderRadius: '8px',
                }}
              >
                {tasks.map((task, index) => {
                  const labelId = `checkbox-list-label-${index}`

                  return (
                    <ListItem
                      key={task.id}
                      secondaryAction={
                        <>
                          {/*<IconButton edge="end" aria-label="edit">
                            <EditIcon />
                          </IconButton>*/}
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </>
                      }
                      disablePadding
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(index)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={task.title} />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
    </TemplateFrame>
  )
}
