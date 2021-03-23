import {SET_USER_DATA, SET_USER_LOGOUT} from '../actions/actionTypes.js'

const initialState = {
    currentUserData: null,
    signedIn: false
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                currentUserData: action.payload,
                signedIn: true
            }
        case SET_USER_LOGOUT :
                return {
                    ...state,
                    currentUserData: null,
                    signedIn: false
                }
        default:
            return state;
    }
}

export default users;