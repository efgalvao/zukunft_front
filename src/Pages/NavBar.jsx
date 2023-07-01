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
          <Link to="/accounts" onClick={switchMenu}>Accounts</Link>
        </li>
        <li>
          <Link to="/cards" onClick={switchMenu}>Cards</Link>
        </li>
        <li>
          <Link to="/categories" onClick={switchMenu}>Categories</Link>
        </li>
        <li>
          <Link to="/shortcuts" onClick={switchMenu}>ShortCuts</Link>
        </li>
        <li>
          <Link to="/logout" onClick={switchMenu}>Logout</Link>
        </li>
        <li>
          <Link to="/about" onClick={switchMenu}>About</Link>
        </li>
        <li>
          <Link to="/transferences" onClick={switchMenu}>Transferences</Link>
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
