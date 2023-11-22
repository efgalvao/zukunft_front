import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { CustomButton, LinkButton } from "../Common/Buttons";

import './pages.css'

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthService.login(formData.email, formData.password).then(
      (result) => {
        navigate('/accounts');
        window.location.reload();

      },
      error => {
        console.log(error);
      }
    );
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div>
      <h2 className='teste'> Please Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            className="inputField"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            className="inputField"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <CustomButton buttonText='Submit' type='submit' color='green' />
        <LinkButton linkTo='/' color='blue' buttonText='Cancel' />
      </form>
    </div>
  );
}
