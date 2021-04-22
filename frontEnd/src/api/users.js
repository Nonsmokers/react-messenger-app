import axios from '../config/axios'

export default Object.assign({
    signIn: postData => axios.post('/user/sign-in', postData).catch((err) => {
        return err.response
    }),
    signUp: postData => axios.post('/user/sign-up', postData).catch((err) => {
        return err.response
    }),
    verifyHash: hash => axios.get('/user/verify?hash=' + hash).catch((err) => {
        console.log(err)
        return err.response
    }),
    getMe: () => axios.get('/user/me').catch((err) => {
        return err.response
    }),
    findUsers: (query) => axios.get('/user/find?query=' + query)
})