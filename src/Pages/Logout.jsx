import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import styled from 'styled-components';
import { LinkButton } from '../Common/Buttons';

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
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <h2 className='teste'>Are you sure you want to logout?</h2>
      <Button color='#8a2633' onClick={handleLogout}>Yes</Button>
      <br />
      <LinkButton linkTo="/" color='#387e3e' buttonText='Cancel' />
    </div>
  );
}

export default Logout;
