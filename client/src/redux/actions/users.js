import {SET_USER_DATA, SET_USER_LOGOUT} from "./actionTypes";
import usersApi from '../../api/users';
import openNotification from "../../utils/openNotification";

const USER_ACTIONS = {

    setUserData: data => ({
        type: SET_USER_DATA,
        payload: data
    }),

    fetchUserData: () => dispatch => {
        usersApi.getMe().then(({data}) => {
            dispatch(USER_ACTIONS.setUserData(data));
        })
    },

    fetchUserLogin: (postData) => async dispatch => {
        const response = await usersApi.signIn(postData)

        if (response.status === 200) {
            const {token} = response.data

            openNotification({
                type: 'success',
                title: 'Успешно',
                text: 'Вы успешно вошли.'
            })

            const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 24 * 7);
            dispatch(USER_ACTIONS.autoLogout(expirationDate - new Date().getTime()))
            window.axios.defaults.headers['token'] = token;
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(USER_ACTIONS.fetchUserData())
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

    fetchUserRegister: (postData) => async dispatch => {
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

    autoLogout: (time) => {
        return dispatch => {
            setTimeout(() => {
                dispatch(USER_ACTIONS.logout())
            }, time)
        }
    },

    logout: () => {
        localStorage.clear()

        return {
            type: SET_USER_LOGOUT
        }
    },

    autoLogin: () => {
        return dispatch => {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(USER_ACTIONS.logout())
            } else {
                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                if (expirationDate <= new Date()) {
                    dispatch(USER_ACTIONS.logout())
                } else {
                    dispatch(USER_ACTIONS.fetchUserData())
                    dispatch(USER_ACTIONS.autoLogout(expirationDate.getTime() - new Date().getTime()))
                }
            }
        }
    }

}

export default USER_ACTIONS;
