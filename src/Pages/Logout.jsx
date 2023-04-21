import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.color || 'green'};
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px 10px 0 0;
`;

export function Logout() {
  let navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <h2 className='teste'>Are you sure you want to logout?</h2>
      <Button color='#8a2633' onClick={handleLogout}>Yes</Button>
      <br />
      <Button color='#387e3e' onClick={handleCancel}>No</Button>
    </div>
  );
}

export default Logout;
