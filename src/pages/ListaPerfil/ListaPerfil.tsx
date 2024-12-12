import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { Usuario } from '@/types';
import { getUserLista } from '@/utils';

function ListaPerfil() {
  const { error: listUserError, data: users } = useQuery<Usuario[]>({
    queryKey: ['usersList'],
    queryFn: () => getUserLista(),
  });

  if (listUserError) return 'Erro ao carregar usuários';

  const columns: GridColDef[] = [
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
  ];

  const rows = users?.map((user) => ({
    id: user.id,
    username: user.username,
    role: user.role,
  })) || [];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: '20px',
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{ mb: '16px', mt: '4px', textAlign: 'center' }}
      >
        Lista de Usuários
      </Typography>

      <Box
        sx={{
          height: 400,
          width: '75vh',//tamanho tabela lista de perfis
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter
        />
      </Box>
    </Box>
  );
}

export default ListaPerfil;
