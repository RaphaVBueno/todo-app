import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClientProvider } from '@tanstack/react-query'

import Dashboard from './components/Dashboard.tsx'
import ProtectedRoutes from './components/ProtectedRoutes.tsx'
import {
  Cadastro,
  Home,
  Login,
  NovaSenha,
  Perfil,
  RecuperarSenha,
} from './pages'
import Adicionar from './pages/Adicionar/adicionar.tsx'
import theme from './theme'
import { queryClient } from './utils'
import { AuthProvider } from './contexts/AuthContext.tsx'

function App() {
  const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/cadastro', element: <Cadastro /> },
    { path: '/nova-senha/:token', element: <NovaSenha /> },
    { path: '/recuperar-senha', element: <RecuperarSenha /> },
    {
      path: '/:date?',
      element: (
        <ProtectedRoutes>
          <Dashboard />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, path: ':date?', element: <Home /> },
        { path: 'perfil', element: <Perfil /> },
        { path: 'adicionar', element: <Adicionar /> },
      ],
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <CssBaseline enableColorScheme />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
