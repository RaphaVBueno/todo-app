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
import getDashboardTheme from './theme/getDashboardTheme'
import AppNavbar from './components/AppNavbar'
import Header from './components/Header'
import SideMenu from './components/SideMenu'
import TemplateFrame from './TemplateFrame'
import api, { devUser } from './api.utils'
import Lista from './components/Lista'
import AddTaskButton from './components/AddTaskButton' // Importa o botão

type Task = {
  id: number
  title: string
  status: boolean
  date: string
  description: string | null
  userId: number
  listId: number | null
  tags: { id: number; name: string; userId: number }[]
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filterColor, setFilterColor] = useState<string | null>(null)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
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

  function filteringTasks(listId: number) {
    const result = tasks.filter((task) => task.listId === listId)
    setFilteredTasks(result)
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
          <SideMenu
            date={date}
            setFilterColor={setFilterColor}
            filteringTasks={filteringTasks}
          />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: 'auto',
              position: 'relative',
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
              {tasks.length === 0 ? (
                <div></div>
              ) : filterColor ? (
                <Lista tasksList={filteredTasks} />
              ) : (
                <Lista tasksList={tasks} />
              )}
            </Stack>
            <AddTaskButton />{' '}
          </Box>
        </Box>
      </ThemeProvider>
    </TemplateFrame>
  )
}
