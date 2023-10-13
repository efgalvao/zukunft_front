import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class AccountService {
  getAccountList() {
    return axios.get(API_URL + 'api/v1/accounts', { headers: authHeader() });
  }

  getAccount(id: number) {
    return axios.get(API_URL + `api/v1/accounts/${id}`, { headers: authHeader() });
  }

  createAccount(body: any) {
    return axios.post(API_URL + 'api/v1/accounts', body, { headers: authHeader() });
  }

  deleteAccount(id: number) {
    return axios.delete(API_URL + `api/v1/accounts/${id}`, { headers: authHeader() });
  }


  getBrokers() {
    return axios.get(API_URL + 'api/v1/brokers', { headers: authHeader() });
  }

  getAccountReport(id: number) {
    return axios.get(API_URL + `api/v1/accounts/${id}/current_account_report`, { headers: authHeader() });
  }

  getAccountReports(body: any) {
    return axios.get(API_URL + `api/v1/accounts/${body.account_id}/account_reports`, { params: body, headers: authHeader() });
  }
}

export default new AccountService();
