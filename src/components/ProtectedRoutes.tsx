import { ReactNode } from 'react'

import { useAuth } from '@/hooks'
import { Navigate } from 'react-router-dom'

type ProtectedRoutesProps = {
  children: ReactNode
}

function ProtectedRoutes(props: ProtectedRoutesProps) {
  const { user } = useAuth()
  const { children } = props

  if (!user) return <Navigate to="/login" />

  return children
}

export default ProtectedRoutes
