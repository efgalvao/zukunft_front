import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './nav_bar_styles.css';

function NavBar({ loggedIn, switchMenu }) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    window.innerWidth > 600 ?
      setIsDesktop(true) : setIsDesktop(false);
  }, []);

  window.addEventListener('resize', () => {
    window.innerWidth > 600 ?
      setIsDesktop(true) : setIsDesktop(false);
  });

  const NotLogged = () => {
    return (
      <ul className="menu_items">
        <li>
          <Link to="/login" onClick={switchMenu}>Login</Link>
        </li>
      </ul>
    );
  };

  const Logged = () => {
    return (
      <ul className="menu_items">
        <li>
          <Link to="/" onClick={switchMenu}>Home</Link>
        </li>
        <li>
          <Link to="/accounts" onClick={switchMenu}>Contas</Link>
        </li>
        <li>
          <Link to="/cards" onClick={switchMenu}>Cartões</Link>
        </li>
        <li>
          <Link to="/transferences" onClick={switchMenu}>Transferências</Link>
        </li>
        <li>
          <Link to="/investments" onClick={switchMenu}>Investimentos</Link>
        </li>
        <li>
          <Link to="/categories" onClick={switchMenu}>Categorias</Link>
        </li>
        <li>
          <Link to="/about" onClick={switchMenu}>Sobre</Link>
        </li>
        <li>
          <Link to="/logout" onClick={switchMenu}>Logout</Link>
        </li>
      </ul>
    );
  };

  return (
    <>
      {loggedIn ? <Logged /> : <NotLogged />}
    </>
  )
}

export default NavBar;
