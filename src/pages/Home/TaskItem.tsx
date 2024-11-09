import { ChangeEvent } from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@mui/material'
import Chip from '@mui/material/Chip'
import Brightness1Icon from '@mui/icons-material/Brightness1'
import { format, addDays } from 'date-fns'

import TaskActions from '@/components/TaskActions'
import { Task, List as ListType, Tag } from '@/types'

type TaskItemProps = {
  tasks: Task[]
  title: string
  categories: ListType[]
  tags: Tag[]
  handleClick: (id: number, status: boolean) => void
  handleChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void
}

function TaskItem(props: TaskItemProps) {
  const { tasks, title, categories, tags, handleChange, handleClick } = props

  if (!(tasks.length > 0)) return null

  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '8px',
        mb: 2,
      }}
    >
      <ListItem>
        <ListItemText primary={title} />
      </ListItem>
      {tasks.map((task) => {
        const labelId = `checkbox-list-label-${task.id}`

        return (
          <ListItem
            key={task.id}
            secondaryAction={
              <TaskActions
                taskId={task.id}
                categories={categories}
                taskDescription={task.description}
                taskTitle={task.title}
                taskListId={task.listId}
                tags={tags}
                taskTagsId={task.tags}
              />
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              dense
              onClick={() => handleClick(task.id, task.status)}
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
                primary={
                  <>
                    {task.title}{' '}
                    {task.tags &&
                      task.tags.map((tag) => (
                        <Chip label={tag.name} size="small" key={tag.id} />
                      ))}
                    {task.listId && (
                      <Brightness1Icon
                        style={{
                          color: task.list.color,
                          marginLeft: '6px',
                          position: 'relative',
                          top: '3px',
                        }}
                      />
                    )}
                  </>
                }
                secondary={`${
                  task.dueDate
                    ? format(addDays(new Date(task.dueDate), 1), 'dd/MM/yyyy')
                    : 'Sem data para conclusão'
                }: ${task.description ? task.description : ''}`}
                sx={{
                  textDecoration: task.status ? 'line-through' : 'none',
                }}
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export default TaskItem
