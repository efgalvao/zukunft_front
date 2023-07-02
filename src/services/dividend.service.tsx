import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class DividendService {
  createDividend(body: any) {
    return axios.post(API_URL + 'api/v1/dividends', body, { headers: authHeader() });
  }
}

const dividendServiceInstance = new DividendService();

export default dividendServiceInstance;
