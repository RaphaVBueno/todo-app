import { Container, Box, Button, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import './app.css'

function App() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        height: '97vh',
        width: '150vh',
        backgroundColor: '#e1e3d1',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
        padding: 2,
        position: 'relative' // Permite posicionar elementos de forma absoluta dentro do Container
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: '67%',
          height: '100%',
          position: 'relative', // Permite posicionar elementos de forma absoluta dentro da Box
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginLeft: '20px',
            marginTop: '40px',
          }}
        >
          Boa noite
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            width: '54%',
            height: '7%',
            borderRadius: '12px',
            marginLeft: '20px',
            position: 'absolute', // Posiciona o botão de forma absoluta dentro da Box
            bottom: 0,
          }}
        >
          <h3>Adicionar tarefa</h3>
        </Button>
        <Box
          sx={{
            position: 'absolute', // Posiciona a Box de forma absoluta dentro da Box
            top: '46px', 
            right: '20px',
            width: '70px',
            height: '30px',
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          <Button
            sx={{
              backgroundColor: '#e1e3d1',
              width: '25px',
              height: '25px',
              minWidth: '25px', // Garante que o botão não expanda horizontalmente
              marginTop: '3px',
              marginLeft: '3px'
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
