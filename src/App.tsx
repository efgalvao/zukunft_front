import { Navigationbar } from './Pages/Navigationbar';
import Routes from './routes';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <>
      <Navigationbar />
      <Container style={{ marginTop: '30px' }}>
        {Routes}
      </Container>
    </>
  );
}
export default App;
