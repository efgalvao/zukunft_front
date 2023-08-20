import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class CardService {
  getCardList() {
    return axios.get(API_URL + 'api/v1/cards', { headers: authHeader() });
  }

  createCard(body: any) {
    console.log(body)
    return axios.post(API_URL + 'api/v1/cards', body, { headers: authHeader() });
  }

  getCard(id: number) {
    return axios.get(API_URL + `api/v1/cards/${id}`, { headers: authHeader() });
  }

  deleteCard(id: number) {
    return axios.delete(API_URL + `api/v1/cards/${id}`, { headers: authHeader() });
  }
}

const cardServiceInstance = new CardService();

export default cardServiceInstance;
