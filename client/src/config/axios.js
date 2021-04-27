import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers["token"] = localStorage.token;


window.axios = axios;

export default axios;