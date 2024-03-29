import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class TransactionService {

  getTransactionList(accountId: number) {
    return axios.get(API_URL + `api/v1/accounts/${accountId}/transactions`, { headers: authHeader() });
  }

  getTransaction(accountId: number, transactionId: number) {
    return axios.get(API_URL + `api/v1/accounts/${accountId}/transactions/${transactionId}`, { headers: authHeader() });
  }

  createTransaction(body: any) {
    return axios.post(API_URL + `api/v1/accounts/${body.transaction.account_id}/transactions`, body, { headers: authHeader() });
  }

  updateTransaction(body: any) {
    return axios.put(API_URL + `api/v1/accounts/${body.account_id}/transactions/${body.id}`, body, { headers: authHeader() });
  }
}

const transactionServiceInstance = new TransactionService();

export default transactionServiceInstance;
