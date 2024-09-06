import { useColorScheme } from '@mui/material/styles'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded'
import MenuButton, { MenuButtonProps } from './MenuButton'

export default function ToggleColorMode(props: MenuButtonProps) {
  const { mode, systemMode, setMode } = useColorScheme()
  const prefersDarkMode = mode === 'system' && systemMode === 'dark'

  if (!mode) return null

  const toggleColorMode = () => {
    if (mode === 'dark' || prefersDarkMode) {
      setMode('light')
    } else {
      setMode('dark')
    }
  }

  return (
    <MenuButton
      onClick={toggleColorMode}
      size="small"
      aria-label="button to toggle theme"
      {...props}
    >
      {mode === 'dark' || prefersDarkMode ? (
        <WbSunnyRoundedIcon fontSize="small" />
      ) : (
        <ModeNightRoundedIcon fontSize="small" />
      )}
    </MenuButton>
  )
}
