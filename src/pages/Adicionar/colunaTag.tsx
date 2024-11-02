import IconeComTooltip from './EditTagButtons'

const colunaCategoria = (handleMenuOpen) => [
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
    field: 'actions',
    headerName: '',
    width: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <IconeComTooltip
        onEditClick={(e) => handleMenuOpen(e, true)}
        onDeleteClick={() => console.log('Deletar item', params.id)}
      />
    ),
  },
]

export default colunaCategoria
