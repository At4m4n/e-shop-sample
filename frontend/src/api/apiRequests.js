import Axios from 'axios';
import {API_PRODUCT} from "./apiEndpoints";

export const productsApiRequests = Axios.create({baseURL: API_PRODUCT});
