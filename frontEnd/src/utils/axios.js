import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

window.axios = axios

export default axios;