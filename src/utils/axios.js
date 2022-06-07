import axios from 'axios';
import {base_url} from './index'
const axiosInstance = axios.create({
    baseURL: base_url,
    timeout: 5000,
});
export default axiosInstance;
