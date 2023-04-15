import axios from "axios";

const API_URL = "http://127.0.0.1:3000/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", {
        "user": {
          email,
          password
        }
      })
      .then(response => {

        if (response.status === 200) {
          let userData = JSON.parse(JSON.stringify(response.data))
          userData.accessToken = response.headers.authorization.split(' ')[1];
          localStorage.setItem("user", JSON.stringify(userData));
        }

        return response.data;
      });

  }

  logout() {
    localStorage.removeItem("user");
  }

  register(payload: any) {
    return axios.post(API_URL + "signup", payload);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')!);;
  }
}

export default new AuthService();
