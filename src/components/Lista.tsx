import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'

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
}

export default function Lista(props: ListaProps) {
  const { tasksList } = props
  const [checked, setChecked] = useState([])

  const handleToggle = (value) => () => {
    // tem q definir oq é value, se é string, number, boolean, é só colocar assim value:number por exemplo, toda a função tem q saber qual tipo de parametro recebe
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
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
            <ListItemButton
              role={undefined}
              onClick={handleToggle(index)}
              dense
            >
              <ListItemIcon>
                <Checkbox />
              </ListItemIcon>
              <ListItemText id={labelId} primary={task.title} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
