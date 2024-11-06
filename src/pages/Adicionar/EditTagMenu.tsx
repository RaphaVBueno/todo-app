import { Menu, Box, Button, Grid } from '@mui/material'
import Input from '../../components/Input'
import { useState, type Dispatch, type SetStateAction } from 'react'
import BotaoPadrao from '@/components/BotaoPadrao'
import { useMutation } from '@tanstack/react-query'
import { queryClient, updateList, UpdateListParams } from '@/utils'

type EditTagButtonsProps = {
  anchorEl: HTMLElement | null
  openMenu: boolean
  setOpenMenu: Dispatch<SetStateAction<boolean>> //retirar isso
  listId: number
  name: string
}

function EditTagMenu(props: EditTagButtonsProps) {
  const { anchorEl, openMenu, setOpenMenu, listId, name } = props
  const [editName, setEditName] = useState(name)
  const [color, setColor] = useState('#ff1010')

  const handleclose = () => {
    setOpenMenu(false)
    setEditName(name)
  }

  const { mutate } = useMutation({
    mutationFn: (params: UpdateListParams) => updateList(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list'] })
    },
  })

  const handleSubmit = () => {
    mutate({ listId, color, name: editName })
    setOpenMenu(false)
    setEditName(name)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={openMenu}
      PaperProps={{
        style: {
          width: '400px',
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
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          Editar
          <Input
            name="editar"
            required
            fullWidth
            sx={{ marginBottom: 2 }}
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
          />
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <input
              type="color"
              name="input"
              id="color-input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                backgroundColor: color,
                borderRadius: '50%',
              }}
            />
          </Grid>
        </Grid>
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
      </Box>
    </Menu>
  )
}

export default EditTagMenu
