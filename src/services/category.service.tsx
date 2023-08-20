import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class CategoryService {
  getCategoryList() {
    return axios.get(API_URL + 'api/v1/categories', { headers: authHeader() });
  }

  getCategory(id: number) {
    return axios.get(API_URL + `api/v1/categories/${id}`, { headers: authHeader() });
  }

  createCategory(body: any) {
    return axios.post(API_URL + 'api/v1/categories', body, { headers: authHeader() });
  }

  deleteCategory(id: number) {
    return axios.delete(API_URL + `api/v1/categories/${id}`, { headers: authHeader() });
  }
}


const categoryServiceInstance = new CategoryService();

export default categoryServiceInstance;
