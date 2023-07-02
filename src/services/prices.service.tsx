import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class PriceService {
  createPrice(body: any) {
    return axios.post(API_URL + 'api/v1/prices', body, { headers: authHeader() });
  }
}

const priceServiceInstance = new PriceService();

export default priceServiceInstance;
