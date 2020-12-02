import Axios from 'axios';
import { API_CHARGE, API_PRODUCT } from './apiEndpoints';

export const productsApiRequests = Axios.create({baseURL: API_PRODUCT});
export const chargeApiRequests = Axios.create({baseURL: API_CHARGE});
