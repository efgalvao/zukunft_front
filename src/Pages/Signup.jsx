import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { CustomButton, LinkButton } from '../Common/Buttons';

import './pages.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      "user": {
        "name": formData.name,
        "username": formData.username,
        "email": formData.email,
        "password": formData.password
      }
    }
    AuthService.register(payload).then(
      (response) => {
        console.log(response);

        if (response.status === 201) {
          navigate('/categories');
        }
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
      <h2 className='teste'> Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            className="inputField"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            className="inputField"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
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
        <LinkButton linkTo="/" color='blue' buttonText='Cancel' />
      </form>
    </div>
  );
}

export default Signup;
