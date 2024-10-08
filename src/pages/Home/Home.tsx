import { useOutletContext } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Stack from '@mui/material/Stack'

import Header from '../../components/Header'
import Lista from '../../components/Lista'
import AddTaskButton from '../../components/AddTaskButton'
import { DashboardContext, Task } from '../../types'
import { getTasks, getUserLists, devUser } from '../../utils'
import { List } from '../../types/list'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

function Home() {
  const { date, setDate, filter, setFilter } =
    useOutletContext<DashboardContext>()
  const [searchList, setSearchList] = useState<Task[] | null>(null)
  const {
    isPending,
    error: tasksError,
    data: tasks,
  } = useQuery<Task[]>({
    queryKey: ['tasks', date],
    queryFn: getTasks(date),
  })
  if (tasksError) return 'Erro ao carregar tarefas'

  const { error: categoriesError, data: categories } = useQuery<List[]>({
    queryKey: ['list'],
    queryFn: () => getUserLists(devUser),
  })
  if (categoriesError) return 'Erro'

  return (
    <Stack sx={{ height: '100%' }} justifyContent="space-between">
      <Stack
        spacing={8}
        sx={{
          pb: 10,
          mt: { xs: 10, md: 0 },
        }}
      >
        <Header
          date={date}
          setDate={setDate}
          filter={filter}
          setFilter={setFilter}
          categories={categories || []}
          setSearchList={setSearchList}
        />

        {isPending ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: '50vh' }} // Ajuste a altura conforme necessário
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Lista
            tasksList={
              searchList && searchList.length > 0
                ? searchList
                : filter
                ? tasks?.filter((task) => task.listId === filter)
                : tasks
            }
            categories={categories || []}
            date={date}
          />
        )}
      </Stack>
      <AddTaskButton categories={categories || []} />
    </Stack>
  )
}

export default Home
