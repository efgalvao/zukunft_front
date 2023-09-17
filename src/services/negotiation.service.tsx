import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class NegotiationService {
  createNegotiation(body: any) {
    return axios.post(API_URL + 'api/v1/negotiations', body, { headers: authHeader() });
  }
}

const negotiationServiceInstance = new NegotiationService();

export default negotiationServiceInstance;
