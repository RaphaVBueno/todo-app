import { createContext, useEffect, useState } from 'react'

import { Usuario } from '@/types'
import { LoginParams, getUser, login } from '@/utils'

type AuthContextType = {
  user: Usuario | null
  signIn: (params: LoginParams) => void
  signOut: () => void
}

const KEY = 'token'

export const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const { children } = props

  useEffect(() => {
    const init = async () => {
      const user = await getUser()
      setUser(user)
    }
    init()
  }, [])

  const signIn = async (data: LoginParams) => {
    const token = await login(data)
    localStorage.setItem(KEY, token)
    const user = await getUser()
    console.log({ authUser: user })
    setUser(user)
  }

  const signOut = () => {
    localStorage.removeItem(KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
