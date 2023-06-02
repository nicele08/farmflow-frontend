import { keys } from '@/utils/constants';
import Secure from '@/utils/secureLs';
import axios from 'axios';

const API = axios.create({
  baseURL: keys.DEFAULT_API,
  headers: {
    Authorization: `Bearer ${Secure.getToken()}`,
    'Content-Type': 'application/json',
  },
});

export default API;
