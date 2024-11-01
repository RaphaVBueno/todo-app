import { IconButton, Tooltip, Box } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

interface IconeComTooltipProps {
  onEditClick: (event: React.MouseEvent<HTMLElement>) => void
  onDeleteClick: (event: React.MouseEvent<HTMLElement>) => void
}

const IconeComTooltip: React.FC<IconeComTooltipProps> = ({
  onEditClick,
  onDeleteClick,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginRight: '16px',
      marginTop: '5px',
    }}
  >
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
      <IconButton edge="end" aria-label="edit" onClick={onEditClick}>
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
        sx={{ ml: 2 }}
        onClick={onDeleteClick}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </Box>
)

export default IconeComTooltip
