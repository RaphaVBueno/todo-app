import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
//import EditIcon from '@mui/icons-material/Edit'
import { api, devUser } from '../utils'

type Task = {
  id: number
  title: string
  status: boolean
  date: string
  description: string | null
  userId: number
  listId: number | null
  tags: { id: number; name: string; userId: number }[]
}

type ListaProps = {
  tasksList: Task[]
  shouldRefresh: () => void
}

export default function Lista(props: ListaProps) {
  const { tasksList, shouldRefresh } = props

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    const newStatus = event.target.checked
    await updateTaskStatus(taskId, newStatus)
  }

  const updateTaskStatus = async (id: number, status: boolean) => {
    try {
      const newStatus = { id: id, status: status, userId: devUser }
      await api.post('/tasks/${id}/update', newStatus)
      shouldRefresh()
    } catch (error) {
      console.error('Erro ao atualizar status da tarefa:', error)
    }
  }

  return (
    <List
      sx={{
        width: '90%',
        maxWidth: 1920,
        bgcolor: 'background.paper',
        borderRadius: '8px',
      }}
    >
      {tasksList.map((task, index) => {
        const labelId = `checkbox-list-label-${index}`

        return (
          <ListItem
            key={task.id}
            secondaryAction={
              <>
                {/*<IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>*/}
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.status}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onChange={event => handleChange(event, task.id)}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={task.title}
                sx={{ textDecoration: task.status ? 'line-through' : 'none' }}
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
