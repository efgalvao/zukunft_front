import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class AccountReportService {
  getCurrentAccountReport(id: number) {
    return axios.get(API_URL + `api/v1/accounts/${id}/current_account_report`, { headers: authHeader() });
  }

  getAccountReports(body: any) {
    return axios.get(API_URL + `api/v1/accounts/${body.account_id}/account_reports`, { params: body, headers: authHeader() });
  }
}

const accountReportServiceInstance = new AccountReportService();

export default accountReportServiceInstance;
