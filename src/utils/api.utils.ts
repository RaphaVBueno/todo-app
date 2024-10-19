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

export const getTasks = (dueDate: Date | null | string) => async () => {
  const res = await api.get('/tasks', {
    params: {
      dueDate: format(dueDate, 'yyyy-MM-dd'),
    },
  })
  return res.data.tasks
}

export type AddTaskParams = {
  title: string
  dueDate: Date | null
  userId: number
  description: string | null
  listId: number | null
  tagId: number | null
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
  id: number
  status: boolean
  date: Date | string | null
}) => {
  const { id, status, date } = params
  return await api.post(`/tasks/${id}/status`, {
    id,
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

export const deleteTask = async (userId: number, id: number) => {
  const res = await api.delete(`/tasks/${id}`, { params: { id, userId } })
  return res.data.message
}

export type updateTaskParams = {
  taskId: number
  title: string | null
  description: string | null
  listId: number | null | undefined
  tagId: number | null | undefined
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
  const res = await api.post('/tasks/${id}/update', {
    id: taskId,
    title,
    description,
    listId,
    tagId,
    userId,
  })
  return res.data.message
}

export const searchTask = async (search: string) => {
  const res = await api.get(`/tasks/busca/${search}`)
  return res.data.tasks
}

export type addUserParams = {
  email: string | null
  password: string | null
  name: string | null
  birthDate: string | null
  username: string | null
}

export const addUser = async ({
  email,
  password,
  name,
  birthDate,
  username,
}: addUserParams) => {
  const res = await api.post(`/user/add`, {
    email,
    password,
    name,
    birthDate: format(birthDate, 'yyyy-MM-dd'),
    username,
  })
  return res.data.message
}

type LoginParams = {
  email: string
  password: string
}
export const login = async (data: LoginParams) => {
  const res = await api.post('/login', data)
  return res.data.token
}
