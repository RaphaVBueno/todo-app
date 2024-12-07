import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '@/hooks'
import { Role } from '@/types'

import Loading from './Loading'

type ProtectedRoutesProps = {
  children: ReactNode
  authorizedRoles?: Role[]
}

function ProtectedRoutes(props: ProtectedRoutesProps) {
  const { user, loading } = useAuth()
  const { children, authorizedRoles } = props

  if (loading) return <Loading fullScreen />

  if (!user) return <Navigate to="/login" />

  if (authorizedRoles && !authorizedRoles.includes(user.role))
    return 'Acesso negado'

  return children
}

export default ProtectedRoutes
