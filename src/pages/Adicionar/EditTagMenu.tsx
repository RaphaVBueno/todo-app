import { Menu, Box, Button } from '@mui/material'
import Input from '../../components/Input'
import { useState, type Dispatch, type SetStateAction } from 'react'
import BotaoPadrao from '@/components/BotaoPadrao'

type EditTagButtonsProps = {
  anchorEl: HTMLElement | null
  openMenu: boolean
  setOpenMenu: Dispatch<SetStateAction<boolean>> //retirar isso
}
//criar logicca para quando clicar fora fechar a janela
function EditTagMenu(props: EditTagButtonsProps) {
  const { anchorEl, openMenu, setOpenMenu } = props
  const [name, setName] = useState('')

  const handleclose = () => setOpenMenu(false)

  //const handleSubmit = () =>

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
          <label style={{ marginBottom: '-10px', display: 'block' }}>
            Editar
          </label>
          <Input
            name="editar"
            required
            onChange={(e) => {}}
            fullWidth
            sx={{ marginBottom: 2 }}
            value={name}
          />
        </Box>

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
