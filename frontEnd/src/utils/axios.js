import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common["token"] = window.localStorage.token;

window.axios = axios;

export default axios;