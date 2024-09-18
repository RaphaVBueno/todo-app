import axios from 'axios'
import { format } from 'date-fns'

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

export const updateTask = async (
  title: string | null,
  description: string | null,
  categories: number | null,
  tag: number | null
) => {
  const res = await api.post('/tasks/${id}/update', {
    title,
    description,
    listId: categories,
    tagId: tag,
  })
  return res.data.message
}
