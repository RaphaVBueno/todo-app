import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Stack } from '@mui/material'

import { getTasks, getUserLists, devUser, getUserTags } from '@/utils'
import { DashboardContext, Task, List, Tag } from '@/types'

import Header from './Header'
import Lista from './Lista'
import AddTaskButton from './AddTaskButton'
import Loading from '@/components/Loading'

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

  const { error: categoriesError, data: categories } = useQuery<List[]>({
    queryKey: ['list'],
    queryFn: () => getUserLists(devUser),
  })

  const { error: tagsError, data: tags } = useQuery<Tag[]>({
    queryKey: ['tag'],
    queryFn: () => getUserTags(devUser),
  })

  if (categoriesError) return 'Erro'
  if (tasksError) return 'Erro ao carregar tarefas'
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
          <Loading />
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
      <AddTaskButton categories={categories || []} tags={tags || []} />
    </Stack>
  )
}

export default Home
