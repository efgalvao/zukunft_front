import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class StockService {

  getStockList(accountId: number) {
    return axios.get(API_URL + 'api/v1/investments/stocks',
      { params: { stock: { account_id: accountId } }, headers: authHeader() });
  }

  getStock(stockId: number) {
    return axios.get(API_URL + `api/v1/investments/stocks/${stockId}`, { headers: authHeader() });
  }

  createStock(body: any) {
    return axios.post(API_URL + 'api/v1/investments/stocks', body, { headers: authHeader() });
  }

  updateStock(body: any, stockId: number) {
    return axios.put(API_URL + `api/v1/investments/stocks/${stockId}`,
      body, { headers: authHeader() });
  }
}

const stockServiceInstance = new StockService();

export default stockServiceInstance;
