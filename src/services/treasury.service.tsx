import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://127.0.0.1:3000/";

class TreasuryService {

  getTreasuryList(accountId: number) {
    return axios.get(API_URL + 'api/v1/investments/treasuries',
      { params: { treasury: { account_id: accountId } }, headers: authHeader() });
  }

  getTreasury(treasuryId: number) {
    return axios.get(API_URL + `api/v1/investments/treasuries/${treasuryId}`, { headers: authHeader() });
  }

  createTreasury(body: any) {
    return axios.post(API_URL + 'api/v1/investments/treasuries', body, { headers: authHeader() });
  }

  updateTreasury(body: any, treasuryId: number) {
    return axios.put(API_URL + `api/v1/investments/treasuries/${treasuryId}`,
      body, { headers: authHeader() });
  }
}

const treasuryServiceInstance = new TreasuryService();

export default treasuryServiceInstance;
