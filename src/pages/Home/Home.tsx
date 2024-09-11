import { useOutletContext } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Stack from '@mui/material/Stack'

import Header from '../../components/Header'
import Lista from '../../components/Lista'
import AddTaskButton from '../../components/AddTaskButton'
import { DashboardContext, Task } from '../../types'
import { getTasks } from '../../utils'

function Home() {
  const { date, setDate, filter } = useOutletContext<DashboardContext>()
  const {
    isPending,
    error,
    data: tasks,
  } = useQuery<Task[]>({
    queryKey: ['tasks', date],
    queryFn: getTasks(date),
  })
  if (error) return 'Erro'

  return (
    <Stack sx={{ height: '100%' }} justifyContent="space-between">
      <Stack
        spacing={8}
        sx={{
          pb: 10,
          mt: { xs: 10, md: 0 },
        }}
      >
        <Header date={date} setDate={setDate} />
        {isPending && <div>Carregando...</div>}
        {filter ? (
          <Lista tasksList={tasks?.filter((task) => task.listId === filter)} />
        ) : (
          <Lista tasksList={tasks} />
        )}
      </Stack>
      <AddTaskButton />
    </Stack>
  )
}

export default Home
