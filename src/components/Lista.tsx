import React from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  List as Lists,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
} from '@mui/material'
import TaskActions from './TaskActions'
import { updateTaskStatus, queryClient } from '../utils'
import { Task } from '../types'
import { List } from '../types/list'

type ListaProps = {
  tasksList: Task[] | null | undefined
  categories: List[]
  date: Date | null
}

export default function Lista(props: ListaProps) {
  const { tasksList, categories, date } = props
  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  if (!tasksList || !tasksList.length) return 'Sem tarefas'

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const status = event.target.checked
    mutate({ id, status, date })
  }

  const todoTasks = tasksList.filter((task) => !task.status)
  const completedTasks = tasksList.filter((task) => task.status)

  const handleListItemClick = (id: number, currentStatus: boolean) => {
    mutate({ id, status: !currentStatus, date })
  }

  return (
    <div>
      {todoTasks.length > 0 && (
        <Lists
          sx={{
            width: '90%',
            maxWidth: 1920,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemText primary="Tarefas a Fazer" />
          </ListItem>
          {todoTasks.map((task, index) => {
            const labelId = `checkbox-list-label-${index}`

            return (
              <ListItem
                key={task.id}
                secondaryAction={
                  <TaskActions taskId={task.id} categories={categories} />
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  dense
                  onClick={() => handleListItemClick(task.id, task.status)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.status}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      onChange={(event) => handleChange(event, task.id)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={task.title}
                    secondary={task.dueDate}
                    sx={{
                      textDecoration: task.status ? 'line-through' : 'none',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </Lists>
      )}
      {todoTasks.length > 0 && completedTasks.length > 0 && (
        <Divider sx={{ my: 2 }} />
      )}
      {completedTasks.length > 0 && (
        <Lists
          sx={{
            width: '90%',
            maxWidth: 1920,
            bgcolor: 'background.paper',
            borderRadius: '8px',
          }}
        >
          <ListItem>
            <ListItemText primary="Tarefas Concluídas" />
          </ListItem>
          {completedTasks.map((task, index) => {
            const labelId = `checkbox-list-label-${index}`

            return (
              <ListItem
                key={task.id}
                secondaryAction={
                  <TaskActions taskId={task.id} categories={categories} />
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  dense
                  onClick={() => handleListItemClick(task.id, task.status)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.status}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      onChange={(event) => handleChange(event, task.id)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={task.title}
                    secondary={task.dueDate}
                    sx={{
                      textDecoration: task.status ? 'line-through' : 'none',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </Lists>
      )}
    </div>
  )
}
