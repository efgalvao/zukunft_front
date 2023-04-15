import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class CardService {
  // getPublicContent() {
  //   return axios.get(API_URL + 'all');
  // }

  // getAccounts() {
  //   return axios.get(API_URL + 'accounts', { headers: authHeader() });
  // }

  // getAccountList() {
  //   return axios.get(API_URL + 'api/v1/accounts', { headers: authHeader() });
  // }

  getCard(id: number) {
    return axios.get(API_URL + `api/v1/accounts/${id}`, { headers: authHeader() });
  }

  createCard(body: any) {
    return axios.post(API_URL + 'api/v1/accounts', body, { headers: authHeader() });
  }

  deleteCard(id: number) {
    return axios.delete(API_URL + `api/v1/accounts/${id}`, { headers: authHeader() });
  }

  getCardList() {
    return axios.get(API_URL + 'api/v1/cards', { headers: authHeader() });
  }

  // getBrokers() {
  //   return axios.get(API_URL + 'api/v1/brokers', { headers: authHeader() });
  // }
}

export default new CardService();
