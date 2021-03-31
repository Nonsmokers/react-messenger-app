import axios from '../config/axios'

export default Object.assign({
    signIn: postData => axios.post('/user/sign-in', postData),
    signUp: postData => axios.post('/user/sign-up', postData),
    verifyHash: hash => axios.get('/user/verify?hash=' + hash),
    getMe: () => axios.get('/user/me'),
})