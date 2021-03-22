import axios from '../axios'

export default {
    login: () => axios.post('/user/sign-in'),
    register: () => axios.get('/user/sign-up'),

}