import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Dashboard from './components/Dashboard.tsx'
import {
  Home,
} from './pages'
import theme from './theme'

const router = createBrowserRouter([
  {
    path: '/:date?',
    element: <Dashboard />,
    children: [
      { index: true, path: ':date?', element: <Home /> },
    ],
  },
])

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <CssBaseline enableColorScheme />
    </ThemeProvider>
  )
}

export default App
