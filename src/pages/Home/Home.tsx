import { useOutletContext } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Stack from '@mui/material/Stack'

import Header from '../../components/Header'
import Lista from '../../components/Lista'
import AddTaskButton from '../../components/AddTaskButton'
import { DashboardContext, Task } from '../../types'
import { getTasks, getUserLists, devUser, getUserTags } from '../../utils'
import { List } from '../../types/list'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Tag } from '../../types/tag'

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

  const { error: tagsError, data: tags } = useQuery<Tag[]>({
    queryKey: ['tag'],
    queryFn: () => getUserTags(devUser),
  })
  if (tagsError) return 'Erro'

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
            sx={{ height: '50vh' }}
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
            tags={tags || []}
          />
        )}
      </Stack>
      <AddTaskButton categories={categories || []} />
    </Stack>
  )
}

export default Home
