import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Dashboard from './components/Dashboard.tsx'
import {
  Cadastro,
  Home,
  Login,
  NovaSenha,
  Perfil,
  RecuperarSenha,
  Settings,
} from './pages'
import theme from './theme'

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/cadastro', element: <Cadastro /> },
  { path: '/nova-senha/:token', element: <NovaSenha /> },
  { path: '/recuperar-senha', element: <RecuperarSenha /> },
  {
    path: '/:date?',
    element: <Dashboard />,
    children: [
      { index: true, path: ':date?', element: <Home /> },
      { path: 'perfil', element: <Perfil /> },
      { path: 'configuracoes', element: <Settings /> },
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
