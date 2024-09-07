import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export const devUser = 1

export const getTasks = (dueDate: Date | null) => async () => {
  const res = await api.get('/tasks', {
    params: {
      userId: devUser,
      dueDate,
    },
  })
  return res.data.tasks
}

export const updateTaskStatus = async (params: {
  id: number
  status: boolean
}) => {
  const { id, status } = params
  return await api.post('/tasks/${id}/update', {
    id,
    status,
    userId: devUser,
  })
}
