import { useMutation } from '@tanstack/react-query'
import { Divider } from '@mui/material'

import { updateTaskStatus, queryClient } from '@/utils'
import { Task, List, Tag } from '@/types'

import TaskItem from './TaskItem'

type ListaProps = {
  tasksList: Task[] | null | undefined
  categories: List[]
  date: Date
  tags: Tag[]
}

export default function Lista(props: ListaProps) {
  const { tasksList, categories, date, tags } = props
  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  if (!tasksList || !tasksList.length) return 'Sem tarefas' //renderizar algo melhor aqui nesse sem tarefas

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    const status = event.target.checked
    mutate({ taskId, status, date })
  }

  const todoTasks = tasksList.filter((task) => !task.status)
  const completedTasks = tasksList.filter((task) => task.status)
  /** Renderiza uma barra divisória quando existem tarefas concluídas e pendentes ao mesmo tempo */
  const hasDivider = todoTasks.length > 0 && completedTasks.length > 0

  const handleListItemClick = (taskId: number, currentStatus: boolean) => {
    mutate({ taskId, status: !currentStatus, date })
  }

  return (
    <div>
      <TaskItem
        title="Tarefas a fazer"
        tasks={todoTasks}
        categories={categories}
        tags={tags}
        handleClick={handleListItemClick}
        handleChange={handleChange}
      />
      {hasDivider && <Divider sx={{ my: 2 }} />}
      <TaskItem
        title="Tarefas Concluídas"
        tasks={completedTasks}
        categories={categories}
        tags={tags}
        handleClick={handleListItemClick}
        handleChange={handleChange}
      />
    </div>
  )
}
