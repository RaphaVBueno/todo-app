import { Role, Usuario } from '@/types'
import axios from 'axios'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const devUser = 1

export const getTasks =
  (dueDate: Date | null | string, search: string) => async () => {
    if (search) {
      await wait(1500)
      const res = await api.get(`/tasks/busca/${search}`)
      return res.data.tasks
    } else {
      const res = await api.get('/tasks', {
        params: {
          dueDate: format(dueDate, 'yyyy-MM-dd'),
        },
      })
      return res.data.tasks
    }
  }

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const searchTask = async (search: string) => {
  const res = await api.get(`/tasks/busca/${search}`)
  return res.data.tasks
}

export type AddTaskParams = {
  title: string
  dueDate: Date | null
  userId: number
  description: string | null
  listId: number | null
  tagId: number[]
}

export const addTask = async ({
  title,
  dueDate,
  userId,
  description,
  listId,
  tagId,
}: AddTaskParams) => {
  if (!dueDate) {
    dueDate = toZonedTime(new Date(), 'America/Sao_Paulo')
  }
  const res = await api.post('/tasks/add', {
    title,
    dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : null,
    userId,
    description,
    listId,
    tagId,
  })
  return res.data.message
}

export const updateTaskStatus = async (params: {
  taskId: number
  status: boolean
  date: Date | string | null
}) => {
  const { taskId, status, date } = params
  return await api.post(`/tasks/${taskId}/status`, {
    taskId,
    status,
    userId: devUser,
    completedDate: format(date, 'yyyy-MM-dd'),
  })
}

export const getUserLists = async (user: number) => {
  const res = await api.get(`/list/userList/${user}`)
  return res.data.categories
}

export const getUserTags = async (user: number) => {
  const res = await api.get(`/tag/usertaglist/${user}`)
  return res.data.tags
}

export const deleteTask = async (taskId: number) => {
  const res = await api.delete(`/tasks/${taskId}`)
  return res.data.message
}

export type updateTaskParams = {
  taskId: number
  title: string | null
  description: string | null
  listId: number | null | undefined
  tagId: number[] | null | undefined
  userId: number | null
}

export const updateTask = async ({
  taskId,
  title,
  description,
  listId,
  tagId,
  userId,
}: updateTaskParams) => {
  console.log(tagId)
  const res = await api.post('/tasks/${id}/update', {
    taskId,
    title,
    description,
    listId,
    tagId,
    userId,
  })
  return res.data.message
}

export type AddUserParams = {
  email: string | null
  password: string | null
  name: string | null
  birthDate: string
  username: string | null
}

export const addUser = async (params: AddUserParams) => {
  try {
    const res = await api.post(`/user/add`, {
      ...params,
      birthDate: format(params.birthDate, 'yyyy-MM-dd'),
    })
    return { success: true, message: res.data.message }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message || 'Erro ao adicionar usuário',
      }
    } else {
      console.error('Erro inesperado:', error)
      return { success: false, message: 'Erro inesperado' }
    }
  }
}

export type LoginParams = {
  email: string
  password: string
}
export const login = async (data: LoginParams) => {
  const res = await api.post('/login', data)
  const { token } = res.data

  api.defaults.headers['Authorization'] = `Bearer ${token}`

  return token
}

export const getUser = async () => {
  const res = await api.get('/user/me')
  const { user } = res.data as { user: Usuario }
  return user
}

export type AddListParams = {
  listName: string
  color?: string | null
}

export const addList = async (params: AddListParams) => {
  const { listName, color } = params
  const res = await api.post('/list/add ', { listName, color })
  return { message: res.data.message }
}

export type UpdateListParams = {
  listId: number | undefined
  color: string | null
  name: string
}

export const updateList = async (params: UpdateListParams) => {
  const { listId, color, name } = params
  const res = await api.put('/list/edit', { listId, color, name })
  return res.data.message
}

export const deleteList = async (listId: number | undefined) => {
  const res = await api.delete(`/list/${listId}`)
  return res.data.message
}

export type UpdateTagParams = {
  tagId: number | undefined
  name: string
}

export const updateTag = async (params: UpdateTagParams) => {
  const { tagId, name } = params
  const res = await api.put('/tag/edit', { tagId, name })
  return res.data.message
}

export const deleteTag = async (tagId: number | undefined) => {
  const res = await api.delete(`/tag/${tagId}`)
  return res.data.message
}

export type AddTagParams = {
  name: string | undefined
}

export const addTag = async (params: AddTagParams) => {
  const { name } = params
  const res = await api.post('/tag/add ', { name })
  return { message: res.data.message }
}

export type UpdateUserParams = {
  name?: string | undefined
  password?: string | undefined
  email?: string | undefined
  username?: string | undefined
}

export const updateUser = async (params: UpdateUserParams) => {
  try {
    const { name, password, email, username } = params
    const res = await api.put('/user/', { name, password, email, username })
    return { success: true, message: res.data.message }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message || 'Erro ao atualizar usuário',
      }
    } else {
      console.error('Erro inesperado:', error)
      return { success: false, message: 'Erro inesperado' }
    }
  }
}

export type NewPasswordParams = {
  id: number | undefined
  password: string
  token: string | undefined
}

export const newPassword = async (params: NewPasswordParams) => {
  const { id, password, token } = params
  const res = await api.put('/user/new-password', { id, password, token })
  return res.data.message
}

export const validateToken = async (token: string | undefined) => {
  const res = await api.post(`/validate-token/${token}`)
  return res.data.userId
}

export const tokenGenerate = async (email: string) => {
  console.log(email)
  const res = await api.post('/token-generate', { email })
  return res.data.message
}

export const getUserLista = async () => {
  const res = await api.get(`/user`)
  return res.data.users
}

export const deleteUser = async (userId: number) => {
  const res = await api.delete(`/user`, { data: { id: userId } })
  return res.data.message
}

export type UpdateUserRoleParams = {
  userId: number
  newRole: Role
}

export const updateUserRole = async (params: UpdateUserRoleParams) => {
  const { userId, newRole } = params
  const res = await api.put(`/user/change-role`, { userId, newRole })
  return res.data.message
}
