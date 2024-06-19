import axios from 'axios';

export const connectionAPI = axios.create({
  baseURL: 'http://localhost:1200',
});
