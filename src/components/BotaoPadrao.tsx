import { Button } from '@mui/material'

type BotaoPadraoProps = {
  action: () => void
  buttonName: string
}

function BotaoPadrao(props: BotaoPadraoProps) {
  const { action, buttonName } = props

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={action}
      sx={{ height: '40px', width: '130px', fontSize: '1rem' }}
    >
      {buttonName}
    </Button>
  )
}

export default BotaoPadrao
