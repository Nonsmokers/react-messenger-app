import {SET_USER_DATA, SET_USER_LOGOUT} from '../actions/actionTypes.js'

const initialState = {
    currentUserData: null,
    signedIn: !!window.localStorage.token,
    token: window.localStorage.token,
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                currentUserData: action.payload,
                signedIn: true,
                token: window.localStorage.token
            }
        case SET_USER_LOGOUT :
            return {
                ...state,
                currentUserData: null,
                signedIn: false,
                token: ''
            }
        default:
            return state;
    }
}

export default users;