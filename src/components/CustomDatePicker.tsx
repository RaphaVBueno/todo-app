import * as React from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Button from '@mui/material/Button'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from '@mui/x-date-pickers/models'
import type { Dispatch, SetStateAction } from 'react'

/**
 * Propriedades para o componente `ButtonField`
 */
interface ButtonFieldProps
  extends UseDateFieldProps<Date, false>,
    BaseSingleInputFieldProps<
      Date | null,
      Date,
      FieldSection,
      false,
      DateValidationError
    > {
  /** Função para alternar o estado de abertura do DatePicker */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Componente que renderiza um botão personalizado para abrir o seletor de data
 *
 * @param props - Propriedades do botão
 * @returns O componente `ButtonField`
 */
function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: 'fit-content' }}
    >
      {label ? `${label}` : 'Pick a date'}
    </Button>
  )
}

/**
 * Propriedades para o componente `CustomDatePicker`
 */
type CustomDatePickerProps = {
  /** Data atualmente selecionada */
  date: Date
  /** Função para atualizar a data selecionada */
  setDate: Dispatch<SetStateAction<Date>>
}

/**
 * Componente que renderiza um seletor de data com um botão customizado
 *
 * @param props - Propriedades do componente
 * @param props.date - Data atualmente selecionada
 * @param props.setDate - Função para atualizar a data selecionada
 * @returns O componente `CustomDatePicker`
 */
export default function CustomDatePicker(props: CustomDatePickerProps) {
  const { date, setDate } = props
  const [open, setOpen] = React.useState(false)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <DatePicker
        value={date}
        label={
          date == null ? null : format(date, 'dd MMM, yyyy', { locale: ptBR })
        }
        onChange={(newValue) => {
          if (newValue) {
            setDate(newValue)
          }
        }}
        slots={{ field: ButtonField }}
        slotProps={{
          field: { setOpen } as any,
          nextIconButton: { size: 'small' },
          previousIconButton: { size: 'small' },
        }}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    </LocalizationProvider>
  )
}
