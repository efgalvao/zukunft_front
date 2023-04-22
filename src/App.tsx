import { useState } from 'react';
import Navigationbar from './Pages/Navigationbar';
import Routes from './routes';
import { Container } from 'react-bootstrap';

function App() {
  let Logged = localStorage.getItem('user') ? true : false;
  const [loggedIn] = useState(Logged);

  return (
    <>
      <Navigationbar loggedIn={loggedIn} />
      <Container style={{ marginTop: '30px' }}>
        {Routes}
      </Container>
    </>
  );
}
export default App;
