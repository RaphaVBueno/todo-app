import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'

import AppNavbar from './AppNavbar'
import SideMenu from './SideMenu'
import TemplateFrame from './TemplateFrame'
import type { DashboardContext } from '../types'
import { toZonedTime } from 'date-fns-tz'

export default function Dashboard() {
  const now = toZonedTime(new Date(), 'America/Sao_Paulo')
  const [date, setDate] = useState<Date | null>(now)
  const [filter, setFilter] = useState<number | null>(null)

  return (
    <TemplateFrame>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            pt: 1.5,
            px: 4,
          })}
        >
          <Outlet
            context={
              { filter, date, setDate, setFilter } satisfies DashboardContext
            }
          />
        </Box>
      </Box>
    </TemplateFrame>
  )
}
