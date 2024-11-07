import { List, Tag } from '@/types'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import EditTagButtons from './EditTagButtons'
import Brightness1Icon from '@mui/icons-material/Brightness1'

type TabelaProps = {
  categories?: List[] | undefined
  tags?: Tag[] | undefined
}

const colunaList: GridColDef[] = [
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
    headerAlign: 'center',
    align: 'center',
    type: 'number',
  },
  {
    field: 'color',
    headerName: 'Cor',
    width: 100,
    disableColumnMenu: true,
    headerAlign: 'center',
    align: 'center',
    sortable: false,
    type: 'string',
    renderCell: (params: any) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Brightness1Icon
          style={{
            color: `${params.row.color}`,
            fontSize: '16px',
          }}
        />
      </div>
    ),
  },
  {
    field: 'actions',
    headerName: '',
    width: 100,
    sortable: false,
    disableColumnMenu: true,
    type: 'actions',
    renderCell: (params: any) => (
      <EditTagButtons
        name={params.row.name}
        listId={params.row.id}
        listColor={params.row.color}
      />
    ),
    headerAlign: 'center',
    align: 'center',
  },
]

const colunaTag: GridColDef[] = [
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
    headerAlign: 'center',
    align: 'center',
    type: 'number',
  },
  {
    field: 'actions',
    headerName: '',
    width: 100,
    sortable: false,
    disableColumnMenu: true,
    type: 'actions',
    renderCell: (params: any) => (
      <EditTagButtons name={params.row.name} tagId={params.row.id} />
    ),
    headerAlign: 'center',
    align: 'center',
  },
]

function Tabela(props: TabelaProps) {
  const { categories, tags } = props

  return (
    <DataGrid
      columns={categories ? colunaList : colunaTag}
      hideFooter
      rows={categories ? categories : tags}
    />
  )
}

export default Tabela
