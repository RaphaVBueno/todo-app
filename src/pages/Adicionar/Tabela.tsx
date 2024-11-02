import { List } from '@/types'
import { DataGrid } from '@mui/x-data-grid'
import EditTagButtons from './EditTagButtons'
import { useState } from 'react'

type TabelaProps = {
  categories: List[] | undefined
}

const colunaTag = [
  {
    field: 'name',
    headerName: 'Título',
    flex: 1,
    width: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'quantidade',
    headerName: 'Quantidade',
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: 'color',
    headerName: 'Cor',
    width: 100,
    disableColumnMenu: true,
  },
  {
    field: 'actions',
    headerName: '',
    width: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: any) => <EditTagButtons />,
  },
]

function Tabela(props: TabelaProps) {
  const { categories } = props

  return <DataGrid columns={colunaTag} hideFooter rows={categories} />
}

export default Tabela
