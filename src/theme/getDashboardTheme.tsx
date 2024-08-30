import type {} from '@mui/material/themeCssVarsAugmentation'
import { ThemeOptions, PaletteMode } from '@mui/material/styles'
import type {} from '@mui/x-date-pickers/themeAugmentation'
import { getDesignTokens } from './themePrimitives'
import {
  datePickersCustomizations,
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
} from './customizations'

export default function getDashboardTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      ...datePickersCustomizations,
      ...inputsCustomizations,
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  }
}
