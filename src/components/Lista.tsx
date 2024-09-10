import { useMutation } from '@tanstack/react-query'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
//import EditIcon from '@mui/icons-material/Edit'
import { updateTaskStatus, queryClient } from '../utils'
import { Task } from '../types'

type ListaProps = {
  tasksList: Task[] | null | undefined
}

export default function Lista(props: ListaProps) {
  const { tasksList } = props
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
    mutate({ id, status })
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
                  onChange={(event) => handleChange(event, task.id)}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={task.title}
                secondary={task.dueDate}
                sx={{ textDecoration: task.status ? 'line-through' : 'none' }}
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
