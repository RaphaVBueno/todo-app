import { IconButton, Tooltip, Box } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { deleteList, deleteTag, queryClient } from '@/utils'
import EditTagMenu from './EditTagMenu'

type EditTagButtonsProps = {
  name: string
  listId?: number
  tagId?: number
  listColor?: string
}

function EditTagButtons(props: EditTagButtonsProps) {
  const { name, listId, tagId, listColor } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openMenu, setOpenMenu] = useState(false)

  const { mutate: mutateList } = useMutation({
    mutationFn: () => deleteList(listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list'] })
    },
  })

  const { mutate: mutateTag } = useMutation({
    mutationFn: () => deleteTag(tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpenMenu(true)
  }

  const handleDelete = () => {
    if (listId) {
      mutateList()
    }
    if (tagId) {
      mutateTag()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: '16px',
        marginTop: '5px',
      }}
    >
      <Tooltip
        title="Editar"
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -14],
                },
              },
            ],
          },
        }}
      >
        <IconButton edge="end" aria-label="edit" onClick={handleClick}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip
        title="Deletar"
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -14],
                },
              },
            ],
          },
        }}
      >
        <IconButton
          edge="end"
          aria-label="delete"
          sx={{ ml: 2 }}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <EditTagMenu
        anchorEl={anchorEl}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        name={name}
        listId={listId}
        tagId={tagId}
        listColor={listColor}
      />
    </Box>
  )
}
export default EditTagButtons
