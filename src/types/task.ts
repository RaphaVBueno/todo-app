import { List } from './list'

export type Task = {
  id: number
  title: string
  status: boolean
  dueDate?: string
  completedDate?: string
  description?: string
  userId: number
  listId?: number
  tags: { id: number; name: string; userId: number }[]
  list: List
}
