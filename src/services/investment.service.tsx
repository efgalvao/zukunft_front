import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class InvestmentService {
  getInvestmentsList() {
    return axios.get(API_URL + 'api/v1/investments', { headers: authHeader() });
  }
}

const investmentServiceInstance = new InvestmentService();

export default investmentServiceInstance;
