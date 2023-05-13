import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class TransferenceService {

  getTransferenceList() {
    return axios.get(API_URL + `api/v1/transferences`, { headers: authHeader() });
  }

  createTransference(body: any) {
    return axios.post(API_URL + "api/v1/transferences", body, { headers: authHeader() });
  }
}

const transferenceServiceInstance = new TransferenceService();

export default transferenceServiceInstance;
