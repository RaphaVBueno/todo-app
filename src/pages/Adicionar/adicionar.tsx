import { 
  Card, 
  TextField, 
  Grid, 
  Tooltip, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText 
} from '@mui/material'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Adicionar() {
  const renderList = (items) => {
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {items.map((value) => {
          const labelId = `list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton dense>
                <ListItemText id={labelId} primary={`Item ${value}`} />
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
                  <IconButton edge="end" aria-label="edit">
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
                    sx={{ ml: 1, mr: '-16px' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField 
            label="Adicionar Categoria" 
            fullWidth 
            variant="outlined" 
          />
          {renderList([0, 1, 2, 3])}
        </Grid>
        <Grid item xs={6}>
          <TextField 
            label="Adicionar Tag" 
            fullWidth 
            variant="outlined" 
            sx={{ mr: 2 }} 
          />
          {renderList([11, 12, 13, 14])}
        </Grid>
      </Grid>
    </Card>
  );
}

export default Adicionar;
