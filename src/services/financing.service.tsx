import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class FinancingService {
  getFinancingsList() {
    return axios.get(API_URL + 'api/v1/financings/financings', { headers: authHeader() });
  }

  createFinancing(data: any) {
    return axios.post(API_URL + 'api/v1/financings/financings', data, { headers: authHeader() });
  }

  getFinancing(id: string) {
    return axios.get(API_URL + 'api/v1/financings/financings/' + id, { headers: authHeader() });
  }

  deleteFinancing(id: string) {
    return axios.delete(API_URL + 'api/v1/financings/financings/' + id, { headers: authHeader() });
  }
}

const financingServiceInstance = new FinancingService();

export default financingServiceInstance;
