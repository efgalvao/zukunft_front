import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from 'react-bootstrap';


export const Navigationbar = () => {
  return (<>
    <Navbar >
      <Container>
        <Link to="/">Home</Link>
        <Link to="/about">About Me</Link>
      </Container>
    </Navbar><br />
  </>
  )
}
