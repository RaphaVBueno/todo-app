export type Task = {
  id: number
  title: string
  status: boolean
  date: string
  description: string | null
  userId: number
  listId: number | null
  tags: { id: number; name: string; userId: number }[]
}
