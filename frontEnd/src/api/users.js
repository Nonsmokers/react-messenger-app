import axios from '../utils/axios'

export default {
    signIn: postData => axios.post('/user/sign-in', postData),
    signUp: postData => axios.post("/user/sign-up", postData),
    getMe: () => axios.get('/user/me'),
}