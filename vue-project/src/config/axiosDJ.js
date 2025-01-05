import axios from 'axios';

console.log('axios');
const axiosDJ = axios.create({
  baseURL: 'http://localhost:4000',
});

export default axiosDJ;