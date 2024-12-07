import { Stack, CircularProgress } from '@mui/material'

type LoadingProps = {
  fullScreen?: boolean
}

function Loading(props: LoadingProps) {
  const { fullScreen } = props

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: fullScreen ? '100vh' : '50vh' }}
    >
      <CircularProgress />
    </Stack>
  )
}

export default Loading
