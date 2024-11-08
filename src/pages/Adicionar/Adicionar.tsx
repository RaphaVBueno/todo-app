import { useState } from 'react'
import { Grid, Box, Button } from '@mui/material'

import Input from '../../components/Input'

import Tabela from './Tabela'
import { useMutation, useQuery } from '@tanstack/react-query'
import { List, Tag } from '@/types'
import {
  addList,
  AddListParams,
  addTag,
  AddTagParams,
  devUser,
  getUserLists,
  getUserTags,
  queryClient,
} from '@/utils'
//arrumar label
function Adicionar() {
  const { error: categoriesError, data: categories } = useQuery<List[]>({
    queryKey: ['list'],
    queryFn: () => getUserLists(devUser),
  })

  const { error: tagsError, data: tags } = useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: () => getUserTags(devUser),
  })

  if (tagsError) return 'Erro'
  if (categoriesError) return 'Erro'

  const { mutate } = useMutation({
    mutationFn: (params: AddListParams) => addList(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list'] })
    },
  })

  const { mutate: mutateTag } = useMutation({
    mutationFn: (params: AddTagParams) => addTag(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })

  const [newCategorieInput, setCategorieInput] = useState<string>('')

  const handleSubmitList = () => {
    mutate({ listName: newCategorieInput })
    setCategorieInput('')
  }

  const [newTagInput, setTagInput] = useState<string>('')

  const handleSubmitTag = () => {
    mutateTag({ name: newTagInput })
    setTagInput('')
  }

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}></Grid>

        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              Adicionar Categoria
              <Input
                name="categoria"
                required
                fullWidth
                style={{ marginTop: '-10px' }} ///////////////
                value={newCategorieInput}
                onChange={(event) => setCategorieInput(event.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginLeft: '16px',
                marginTop: '20px',
                width: '100px',
                height: '38px',
              }}
              onClick={handleSubmitList}
            >
              Salvar
            </Button>
          </Box>

          <div style={{ height: '80vh', marginTop: '20px' }}>
            <Tabela categories={categories} />
          </div>
        </Grid>

        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              Adicionar Tag
              <Input
                name="tag"
                required
                fullWidth
                style={{ marginTop: '-10px' }} ///////////////
                value={newTagInput}
                onChange={(event) => setTagInput(event.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginLeft: '16px',
                marginTop: '20px',
                width: '100px',
                height: '38px',
              }}
              onClick={handleSubmitTag}
            >
              Salvar
            </Button>
          </Box>

          <div style={{ height: '80vh', marginTop: '20px' }}>
            <Tabela tags={tags} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Adicionar
