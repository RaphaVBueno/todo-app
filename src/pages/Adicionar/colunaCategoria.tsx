import IconeComTooltip from './EditTagButtons'

const colunaTag = (handleMenuOpen) => [
  {
    field: 'título',
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
    field: 'cor',
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
    renderCell: (params) => (
      <IconeComTooltip
        onEditClick={(e) => handleMenuOpen(e, false)}
        onDeleteClick={() => console.log('Deletar item', params.id)}
      />
    ),
  },
]

export default colunaTag
