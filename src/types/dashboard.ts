import type { Dispatch, SetStateAction } from 'react'

export type DashboardContext = {
  filter: number | null
  setFilter: Dispatch<SetStateAction<number | null>>
  date: Date | null
  setDate: Dispatch<SetStateAction<Date | null>>
}
