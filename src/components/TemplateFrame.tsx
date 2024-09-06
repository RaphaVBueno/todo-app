import { ReactNode } from 'react'
import { styled } from '@mui/material/styles'
import { Box, AppBar, Toolbar } from '@mui/material'
import ToggleColorMode from './ToggleColorMode'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}))

type TemplateFrameProps = {
  children: ReactNode
}

export default function TemplateFrame({ children }: TemplateFrameProps) {
  return (
    <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <StyledAppBar>
        <Toolbar
          variant="dense"
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            p: '8px 12px',
          }}
        >
          <div>Logo</div>
          <ToggleColorMode data-screenshot="toggle-mode" />
        </Toolbar>
      </StyledAppBar>
      <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
    </Box>
  )
}
