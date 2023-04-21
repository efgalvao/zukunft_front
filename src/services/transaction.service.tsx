import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class TransactionService {

  getTransactionList(accountId: number) {
    return axios.get(API_URL + `api/v1/accounts/${accountId}/transactions`, { headers: authHeader() });
  }

  getTransaction(accountId: number, id: number) {
    return axios.get(API_URL + `api/v1/accounts/${accountId}/transactions/${id}`, { headers: authHeader() });
  }

  createTransaction(accountId: number, body: any) {
    return axios.post(API_URL + `api/v1/accounts/${accountId}/transactions`, body, { headers: authHeader() });
  }

  updateTransaction(body: any) {
    return axios.put(API_URL + `api/v1/accounts/${body.account_id}/transactions/${body.id}`, body, { headers: authHeader() });
  }
}

export default new TransactionService();
