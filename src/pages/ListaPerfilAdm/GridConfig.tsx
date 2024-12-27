import { GridColDef } from '@mui/x-data-grid'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

const columns = (
    handleEditClick: (event: React.MouseEvent<HTMLElement>, user: any) => void,
    handleDeleteClick: (userId: number) => void
): GridColDef[] => [
        {
            field: 'username',
            headerName: 'Nome do Usuário',
            width: 220,
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: 'role',
            headerName: 'Papéis',
            width: 180,
            sortable: false,
            disableColumnMenu: true,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'actions',
            headerName: '',
            flex: 0.5,
            sortable: false,
            disableColumnMenu: true,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Tooltip
                        title="Editar"
                        placement="top"
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -14],
                                        },
                                    },
                                ],
                            },
                        }}
                    >
                        <IconButton
                            edge="start"
                            aria-label="edit"
                            onClick={(event) => handleEditClick(event, params.row)}
                            sx={{ mt: '5px' }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip
                        title="Deletar"
                        placement="top"
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -14],
                                        },
                                    },
                                ],
                            },
                        }}
                    >
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteClick(params.row.id)}
                            sx={{ ml: '4px', mr: '0px', mt: '5px' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ]

export { columns }
