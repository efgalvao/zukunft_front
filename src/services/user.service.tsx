import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getCards() {
    return axios.get(API_URL + 'cards', { headers: authHeader() });
  }

  getSummary() {
    return axios.get(API_URL + 'summary', { headers: authHeader() });
  }
}

export default new UserService();
