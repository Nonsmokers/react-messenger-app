import axios from '../utils/axios'

export default {
    login: postData => axios.post('/user/sign-in', postData),
    getMe: () => axios.get('/user/me'),
    register: () => axios.get('/user/sign-up'),
}