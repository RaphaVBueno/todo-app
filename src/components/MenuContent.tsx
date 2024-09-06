import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Brightness1Icon from '@mui/icons-material/Brightness1'
import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type MenuContentProps = {
  list: Array<{ name: string; id: number; userId: number; color: string }>
  setFilter: Dispatch<SetStateAction<number | null>>
}

export default function MenuContent(props: MenuContentProps) {
  const { list, setFilter } = props
  const [clicked, setClicked] = useState<number | null>()

  function filterTasks(index: number, listId: number) {
    setClicked((prevClicked) => {
      if (prevClicked === index) {
        setFilter(null)
        return null // Desmarca o item
      } else {
        setFilter(listId)
        return index // Marca o novo item
      }
    })
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {list?.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={index === clicked}
              onClick={() => filterTasks(index, item.id)}
            >
              <ListItemIcon>
                <Brightness1Icon style={{ color: item.color }} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
