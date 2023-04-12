import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { LoginFormData } from '../types/data'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

import './pages.css'

export function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthService.login(formData.email, formData.password).then(
      (result) => {
        console.log('result');

        console.log(result);
        // handle successful login
        // navigate('/home');

        // window.location.reload();
      },
      error => {
        // const resMessage =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
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
          Username:
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
