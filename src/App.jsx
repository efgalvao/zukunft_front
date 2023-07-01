import { useState } from 'react';
// import Navigationbar from './Pages/Navigationbar';
import NavBar from './Pages/NavBar';
import Routes from './routes';
import { Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  let Logged = localStorage.getItem('user') ? true : false;
  const [loggedIn] = useState(Logged);

  const [showMenu, setShowMenu] = useState(false);
  function switch_menu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <div className="icon_container menu_switch">
        <i onClick={switch_menu} className='bi bi-list' />
      </div>
      <div className={`nav_container ${showMenu ? 'menu_active' : null}`}>
        <NavBar loggedIn={loggedIn} switchMenu={switch_menu} />
      </div >
      <Container>
        {Routes}
      </Container>
    </>
  );
}
export default App;
