import axios from '../utils/axios'

export default {
    signIn: postData => axios.post('/user/sign-in', postData),
    signUp: postData => axios.post("/user/signup", postData),
    getMe: () => axios.get('/user/me'),
    register: () => axios.get('/user/sign-up'),
}