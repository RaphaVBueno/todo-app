import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import { Role } from '@/types'

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
import Adicionar from './pages/Adicionar/Adicionar.tsx'
import theme from './theme'
import { queryClient } from './utils'
import { AuthProvider } from './contexts/AuthContext.tsx'
import ListaPerfil from './pages/ListaPerfil/ListaPerfil.tsx'
import ListaPerfilAdm from './pages/ListaPerfilAdm/ListaPerfilAdm.tsx'

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
        {
          path: 'lista-perfil',
          element: (
            <ProtectedRoutes authorizedRoles={[Role.ADMIN]}>
              <ListaPerfil />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'lista-perfil-admin',
          element: (
            <ProtectedRoutes authorizedRoles={[Role.ADMIN]}>
              <ListaPerfilAdm />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <Toaster />
        <CssBaseline enableColorScheme />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
