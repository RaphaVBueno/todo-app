import { createTheme } from '@mui/material/styles'
import {
  datePickersCustomizations,
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
} from './customizations'
import typography from './typography'
import { lightPalette, darkPalette } from './palettes'

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data',
  },
  colorSchemes: {
    dark: { palette: darkPalette },
    light: { palette: lightPalette },
  },
  components: {
    ...datePickersCustomizations,
    ...inputsCustomizations,
    ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations,
  },
  shape: { borderRadius: 8 },
  typography,
})

export default theme
