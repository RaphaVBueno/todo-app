import { useState } from 'react'
import { Grid, Box, Button } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'

import Input from '../../components/Input'

import { colunaList, colunaTag } from './TabelaConfig'
import { DataGrid } from '@mui/x-data-grid'
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
import SnackbarMessage from '@/components/SnackbarMessage'
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
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['list'] })
      setMessage(response.message)
      setOpenMessage(true)
      setStatusSuccess(true)
    },
    onError: () => {
      setMessage('Erro ao adicionar categoria'),
        setOpenMessage(true),
        setStatusSuccess(false)
    },
  })

  const { mutate: mutateTag } = useMutation({
    mutationFn: (params: AddTagParams) => addTag(params),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
      setMessage(response.message)
      setOpenMessage(true)
      setStatusSuccess(true)
    },
    onError: () => {
      setMessage('Erro ao adicionar tag'),
        setOpenMessage(true),
        setStatusSuccess(false)
    },
  })
  const [openMessage, setOpenMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [newCategorieInput, setCategorieInput] = useState<string>('')
  const [statusSuccess, setStatusSuccess] = useState(true)

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
            <DataGrid columns={colunaList} hideFooter rows={categories} />
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
            <SnackbarMessage
              openMessage={openMessage}
              statusSuccess={statusSuccess}
              setOpenMessage={setOpenMessage}
              message={message}
            />
          </Box>

          <div style={{ height: '80vh', marginTop: '20px' }}>
            <DataGrid columns={colunaTag} hideFooter rows={tags} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Adicionar
