import usersApi from '../../utils/api/users';
import {SET_USER_DATA} from "./actionTypes";

const actions = {
    setUser: data => ({
        type: SET_USER_DATA,
        payload: data
    })
}

export default actions;