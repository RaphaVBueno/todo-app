import { List } from '@/types'
import { DataGrid } from '@mui/x-data-grid'
import EditTagButtons from './EditTagButtons'
import Brightness1Icon from '@mui/icons-material/Brightness1'

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
    headerAlign: 'center', // Centraliza o nome da coluna
    align: 'center', // Centraliza o conteúdo da célula
  },
  {
    field: 'color',
    headerName: 'Cor',
    width: 100,
    disableColumnMenu: true,
    headerAlign: 'center', // Centraliza o nome da coluna
    align: 'center', // Centraliza o conteúdo da célula
    renderCell: (params: any) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {/* Alinha o ícone no centro da célula */}
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
    renderCell: (params: any) => (
      <EditTagButtons name={params.row.name} listId={params.row.id} />
    ),
    headerAlign: 'center',
    align: 'center',
  },
]

function Tabela(props: TabelaProps) {
  const { categories } = props

  return <DataGrid columns={colunaTag} hideFooter rows={categories} />
}

export default Tabela
