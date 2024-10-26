import { Stack, CircularProgress } from '@mui/material'

function Loading() {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '50vh' }}>
      <CircularProgress />
    </Stack>
  )
}

export default Loading
