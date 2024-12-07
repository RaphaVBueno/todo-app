import { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Usuario } from '@/types'
import { LoginParams, getUser, login } from '@/utils'

type AuthContextType = {
  user: Usuario | null
  signIn: (params: LoginParams) => void
  signOut: () => void
  loading: boolean
}

const KEY = 'token'

export const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<Usuario | null>(null)
  const { children } = props

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getUser()
        setUser(user)
      } catch (error: unknown) {
        console.log(error)
        toast.error('Erro de inicialização')
      } finally {
        setLoading(false)
      }
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
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
