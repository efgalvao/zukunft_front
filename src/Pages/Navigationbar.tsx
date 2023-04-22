import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from 'react-bootstrap';

export const Navigationbar = () => {
  const loggedIn = localStorage.getItem('user');

  const Logged = () => {
    return (
      <Container>
        <Link to="/">Home</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/cards">Cards</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/shortcuts">ShortCuts</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/about">About</Link>
      </Container>
    );
  };

  const NotLogged = () => {
    return (
      <Container>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/about">About</Link>
      </Container>
    );
  };

  return (
    <>
      <Navbar>
        {loggedIn ? <Logged /> : <NotLogged />}
      </Navbar>
      <br />
    </>
  );
};
