import usersApi from '../../api/users'
import openNotification from "../../utils/openNotification"
import {BaseThunkType, InferActionsTypes} from '../rootReducer'
import {SignInPostDataType, SignUpPostDataType, UserType} from '../../types/types'

export type UserActionsType = InferActionsTypes<typeof USER_ACTIONS>
type ThunkType = BaseThunkType<UserActionsType>

export const USER_ACTIONS = {
    setUserData: (data: UserType) => ({
        type: 'SET_USER_DATA',
        payload: data
    } as const),

    logout: () => {
        localStorage.clear()
        return {type: 'SET_USER_LOGOUT'} as const
    }
}

export const USER_THUNKS = {
    fetchUserData: (): ThunkType => async (dispatch) => {
        const response = await usersApi.getMe()

        dispatch(USER_ACTIONS.setUserData(response.data))

    },

    fetchUserLogin: (postData: SignInPostDataType): ThunkType => async (dispatch) => {
        const response = await usersApi.signIn(postData)

        if (response.status === 200) {
            const {token} = response.data

            openNotification({
                type: 'success',
                title: 'Успешно',
                text: 'Вы успешно вошли.'
            })
            const expirationDate: any = new Date(new Date().getTime() + 3600 * 1000 * 24 * 7)

            dispatch(USER_THUNKS.autoLogout(expirationDate - new Date().getTime()))
            window.axios.defaults.headers['token'] = token
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(USER_THUNKS.fetchUserData())
        }
        if (response.status === 404 || response.status === 403) {
            openNotification({
                type: 'error',
                title: 'Ошибка',
                text: 'Неверный логин или пароль.'
            })
        }
        if (response.status === 423) {
            openNotification({
                type: 'error',
                title: 'Ошибка',
                text: 'Вы не подтвердили аккаунт.'
            })
        }
    },

    fetchUserRegister: (postData: SignUpPostDataType): ThunkType => async (dispatch) => {
        const response = await usersApi.signUp(postData)
        if (response.status === 400) {
            openNotification({
                type: 'error',
                title: 'Ошибка',
                text: 'Аккаунт с такой почтой уже создан.'
            })
        }
        if (response.status === 500) {
            openNotification({
                type: 'error',
                title: 'Ошибка',
                text: 'Возникла серверная ошибка при регистрации. Повторите позже.',
            });
        } else {
            return response
        }
    },

    autoLogout: (time: any): ThunkType => {
        return (dispatch) => {
            setTimeout(() => {
                dispatch(USER_ACTIONS.logout())
            }, time)
        }
    },


    autoLogin: (): ThunkType => {
        return (dispatch) => {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(USER_ACTIONS.logout())
            } else {
                // @ts-ignore
                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                if (expirationDate <= new Date()) {
                    dispatch(USER_ACTIONS.logout())
                } else {
                    dispatch(USER_THUNKS.fetchUserData())
                    dispatch(USER_THUNKS.autoLogout(expirationDate.getTime() - new Date().getTime()))
                }
            }
        }
    }
}