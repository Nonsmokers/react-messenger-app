import {SET_USER_DATA, SET_USER_LOGOUT} from "./actionTypes";
import usersApi from '../../api/users';
import openNotification from "../../utils/openNotification";

const USER_ACTIONS = {

    setUserData: data => ({
        type: SET_USER_DATA,
        payload: data
    }),

    //доделать метод
    fetchUserData: () =>  dispatch => {
        usersApi.getMe().then(({ data }) => {
            console.log(data)
            dispatch(USER_ACTIONS.setUserData(data));
        })
    },
    fetchUserLogin: (postData) => async dispatch => {
        const response = await usersApi.login(postData)
        const {status, token} = response.data
        if (status === 'error') {
            openNotification({
                type: 'error',
                title: 'Ошибка',
                text: 'Неверный логин или пароль.'
            })
        } else {
            openNotification({
                type: 'success',
                title: 'Успешно',
                text: 'Вы успешно вошли.'
            })

            const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 24 * 7);
            dispatch(USER_ACTIONS.autoLogout(expirationDate - new Date().getTime()))

            window.axios.defaults.headers.common['token'] = token;
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate);

            return dispatch(USER_ACTIONS.fetchUserData())
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
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');

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

            }
        }
    }
}

export default USER_ACTIONS;