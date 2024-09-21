import axios from 'axios'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export const devUser = 1

export const getTasks = (dueDate: Date | null | string) => async () => {
  const res = await api.get('/tasks', {
    params: {
      userId: devUser,
      dueDate: format(dueDate, 'yyyy-MM-dd'),
    },
  })
  return res.data.tasks
}

export type AddTaskParams = {
  title: string
  dueDate: Date | null
  userId: number
}

export const addTask = async ({ title, dueDate, userId }: AddTaskParams) => {
  if (!dueDate) {
    dueDate = toZonedTime(new Date(), 'America/Sao_Paulo')
  }

  const res = await api.post('/tasks/add', {
    title,
    dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : null,
    userId,
  })
  return res.data.message
}

export const updateTaskStatus = async (params: {
  id: number
  status: boolean
  date: Date | string | null
}) => {
  const { id, status, date } = params
  return await api.post('/tasks/${id}/update', {
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

export const deleteTask = async (userId: number, id: number) => {
  const res = await api.delete(`/tasks/${id}`, { params: { id, userId } })
  return res.data.message
}

export type updateTaskParams = {
  taskId: number
  title: string | null
  description: string | null
  listId: number | null
  tagId: number | null
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
