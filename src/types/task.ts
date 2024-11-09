import { List } from './list'

export type Task = {
  /** Número de identificação único de uma tarefa */
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
