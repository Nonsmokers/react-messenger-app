import axios from '../config/axios'
import {SignInPostDataType, SignUpPostDataType, UserType} from '../types/types'

type SignInResponseType = {
    status: string
    token: string
}

type VerifyResponseType = {
    message: string
    status: string
}

export default Object.assign({
    signIn: (postData: SignInPostDataType) => axios.post<SignInResponseType>('/user/sign-in', postData).catch((err) => {
        return err.response
    }),
    signUp: (postData: SignUpPostDataType) => axios.post<UserType>('/user/sign-up', postData).catch((err) => {
        return err.response
    }),
    verifyHash: (hash: string) => axios.get<VerifyResponseType>('/user/verify?hash=' + hash).catch((err) => {
        return err.response
    }),
    getMe: () => axios.get<UserType>('/user/me').catch((err) => {
        return err.response
    }),
    findUsers: (query: string) => axios.get<UserType>('/user/find?query=' + query)

})