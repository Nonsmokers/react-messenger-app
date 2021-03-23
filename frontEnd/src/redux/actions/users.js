import usersApi from '../../api/users';
import {SET_USER_DATA} from "./actionTypes";
import openNotification from "../../utils/openNotification";

const USER_ACTIONS = {
    setUserData: data => ({
        type: SET_USER_DATA,
        payload: data
    }),
    fetchUserLogin: (postData) => async dispatch => {
        const response = await usersApi.login(postData)
        console.log(response)
        const {status, token} = response.data
        console.log(status)
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

            localStorage.setItem('token', token);
            console.log(localStorage)
            return dispatch(USER_ACTIONS.setUserData(response.data))
        }
    },
    /*    autoLogout: (time) => {
            return dispatch => {
                setTimeout(() => {
                    dispatch(logout())
                }, time)
            }
        },
        logout: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userLogin');
            localStorage.removeItem('expirationDate');
            return {
                type: AUTH_LOGOUT
            }
        }
    autoLogin: () => {
        return dispatch => {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(USER_ACTIONS.logout())
            } else {
                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                if (expirationDate <= new Date()) {
                    dispatch(logout())
                } else {
                    dispatch(authSuccess(token))
                    dispatch(autoLogout(expirationDate.getTime() - new Date().getTime()))
                }
            }
        }
    }*/
}

export default USER_ACTIONS;