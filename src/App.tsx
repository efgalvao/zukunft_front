import { Navigationbar } from './Pages/Navigationbar';
import Routes from './routes';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <>
      <Container>
        <Navigationbar />
        {Routes}
      </Container>
    </>
  );
}
export default App;
