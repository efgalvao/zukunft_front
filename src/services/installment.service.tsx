import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class InstallmentService {
  getInstallmentList(financingId: string) {
    return axios.get(API_URL + `api/v1/financings/financings/${financingId}/installments`, { headers: authHeader() });
  }

  createInstallment(financingId: string, data: any) {
    return axios.post(API_URL + `api/v1/financings/financings/${financingId}/installments`, data, { headers: authHeader() });
  }

}

const installmentServiceInstance = new InstallmentService();

export default installmentServiceInstance;
