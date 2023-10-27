import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import styled from 'styled-components';
import './pages.css'

const Button = styled.button`
  background-color: ${props => props.color || 'green'};
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px 10px 0 0;
  width:90px;
`;

export function Logout() {
  let navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
    window.location.reload();
  };

  const handleCancel = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='logout'>
      <h2>Are you sure you want to logout?</h2>
      <div>
        <Button color='#8a2633' onClick={handleLogout}>Yes</Button>
        <Button color='#387e3e' onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default Logout;
