import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.headers["token"] = localStorage.token

declare global {
    interface Window {
        axios: typeof axios
    }
}

window.axios = axios

export default axios