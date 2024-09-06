import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Stack from '@mui/material/Stack'

import Header from '../../components/Header'
import Lista from '../../components/Lista'
import AddTaskButton from '../../components/AddTaskButton'
import { DashboardContext, Task } from '../../types'
import { api, devUser } from '../../utils'

function Home() {
  const { date, setDate, filter, setFilter } =
    useOutletContext<DashboardContext>()
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const userResponse = await api.get('/tasks', {
          params: {
            userId: devUser,
            date: date,
          },
        })
        console.log('requisição feita para task', userResponse.data.tasks)
        setTasks(userResponse.data.tasks)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }
    fetchDados()
  }, [date])

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
        {filter ? (
          <Lista tasksList={tasks.filter((task) => task.listId === filter)} />
        ) : (
          <Lista tasksList={tasks} />
        )}
      </Stack>
      <AddTaskButton />
    </Stack>
  )
}

export default Home
