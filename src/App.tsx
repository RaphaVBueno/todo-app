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
        padding: 2
      }}
    >
    <Sidebar/>
      <Box
        sx={{
          width: '67%', // 2/3 da largura do Container
          maxHeight: '95%',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100%'
        }}
      >
      <Typography
          variant="h4"
          sx={{
            alignSelf: 'flex-start',
            marginBottom: '80%',
            marginLeft: '10%',
            padding: "0"
          }}
        >
          Boa noite
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            marginLeft: '0%',
            width:'50%',
            height:'7%',
            borderRadius: '12px',
            marginBottom: '16px',
            padding: '0'
          }}
        >
          <h4>Adicionar tarefa</h4>
        </Button>
      </Box>
    </Container>
  );
}

export default App;
