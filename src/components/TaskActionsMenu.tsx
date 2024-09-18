import type { Dispatch, SetStateAction } from 'react';
import { Menu, MenuItem, TextField, Autocomplete, Button, Stack } from '@mui/material';
import { List } from '../types/list';

type TaskActionsMenuProps = {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  categories: List[];
};

export function TaskActionsMenu(props: TaskActionsMenuProps) {
  const { anchorEl, setAnchorEl, categories } = props;

  const Tag = [{ title: 'Urgente' }, { title: 'Nao sei' }];

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      PaperProps={{
        style: {
          width: 400,
          height: 360,
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
        },
      }}
    >
      <MenuItem sx={{ p: 0, mt: 0 }}>
        <TextField
          id="outlined-basic"
          label="Título da tarefa"
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
            '& .MuiFormLabel-root': { fontSize: '1.1rem' },
          }}
        />
      </MenuItem>

      <MenuItem sx={{ p: 0, mt: '10px' }}>
        <TextField
          id="outlined-multiline"
          label="Descrição"
          variant="outlined"
          multiline
          rows={1}
          fullWidth
          sx={{
            '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
            '& .MuiFormLabel-root': { fontSize: '1.1rem' },
          }}
        />
      </MenuItem>

      <MenuItem sx={{ p: 0, mt: '10px' }}>
        <Autocomplete
          disablePortal
          options={categories}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categoria"
              sx={{
                '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
                '& .MuiFormLabel-root': { fontSize: '1.1rem' },
              }}
            />
          )}
          fullWidth
        />
      </MenuItem>

      <MenuItem sx={{ p: 0, mt: '10px', mb: '30px' }}>
        <Autocomplete
          disablePortal
          fullWidth
          options={Tag}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tag"
              sx={{
                '& .MuiInputBase-root': { height: '44px', fontSize: '1.1rem' },
                '& .MuiFormLabel-root': { fontSize: '1.1rem' },
              }}
            />
          )}
        />
      </MenuItem>

      <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: '45px' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}
          sx={{ height: '40px', width: '130px', fontSize: '1rem' }}
        >
          Cancelar
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}
          sx={{ height: '40px', width: '130px', fontSize: '1rem' }}
        >
          Salvar
        </Button>
      </Stack>
    </Menu>
  );
}
