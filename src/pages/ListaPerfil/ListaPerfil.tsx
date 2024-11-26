import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import Typography from '@mui/material/Typography'

function ListaPerfil() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '80vh',
          paddingTop: '16px',
          paddingRight: '16px',
          paddingLeft: '16px',
          bgcolor: 'background.paper',
          borderRadius: 2,
          mt: '20px',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ mb: '16px', mt: '4px', textAlign: 'center' }}
        >
          Lista de Users
        </Typography>

        <List>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`

            return (
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                }
                disablePadding
                sx={{ mb: '12px' }}
              >
                <ListItemButton role={undefined} dense>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Box>
  )
}

export default ListaPerfil
