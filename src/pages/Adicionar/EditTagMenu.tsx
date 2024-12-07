import { Menu, Box, Button, Typography } from '@mui/material'
import Input from '../../components/Input'
import { useState, type Dispatch, type SetStateAction } from 'react'
import BotaoPadrao from '@/components/BotaoPadrao'
import { useMutation } from '@tanstack/react-query'
import {
  queryClient,
  updateList,
  UpdateListParams,
  updateTag,
  UpdateTagParams,
} from '@/utils'

type EditTagButtonsProps = {
  anchorEl: HTMLElement | null
  openMenu: boolean
  setOpenMenu: Dispatch<SetStateAction<boolean>>
  listId?: number
  name: string
  tagId?: number
  listColor?: string
}

function EditTagMenu(props: EditTagButtonsProps) {
  const { anchorEl, openMenu, setOpenMenu, listId, name, tagId, listColor } =
    props
  const [editName, setEditName] = useState(name)
  const [color, setColor] = useState(listColor || '#ff1010')

  const handleclose = () => {
    setOpenMenu(false)
    setEditName(name)
  }

  const { mutate: mutateList } = useMutation({
    mutationFn: (params: UpdateListParams) => updateList(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list'] })
    },
  })

  const { mutate: mutateTag } = useMutation({
    mutationFn: (params: UpdateTagParams) => updateTag(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })

  const handleSubmit = () => {
    if (listId) {
      mutateList({ listId, color, name: editName })
      setOpenMenu(false)
      setEditName(name)
    }
    if (tagId) {
      mutateTag({ name: editName, tagId })
      setOpenMenu(false)
      setEditName(name)
    }
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={openMenu}
      onClose={handleclose}
      PaperProps={{
        style: {
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
        },
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box>
        Editar
        <Input
          name="editar"
          required
          fullWidth
          sx={{ marginBottom: 2 }}
          value={editName}
          onChange={event => setEditName(event.target.value)}
          style={{ marginTop: '-8px' }}
        />
      </Box>

      {listColor && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{ mr: 2, cursor: 'pointer' }}
            component="label"
            htmlFor="color-input"
          >
            Selecione a cor
          </Typography>
          <input
            type="color"
            name="input"
            id="color-input"
            value={color}
            onChange={e => setColor(e.target.value)}
            style={{
              width: 24,
              height: 24,
              backgroundColor: color,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
          sx={{
            height: '40px',
            width: '130px',
            fontSize: '1rem',
            marginRight: 2,
          }}
        >
          Salvar
        </Button>
        <BotaoPadrao buttonName="Cancelar" action={handleclose} />
      </Box>
    </Menu>
  )
}

export default EditTagMenu
