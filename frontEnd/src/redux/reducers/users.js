import {SET_USER_DATA} from '../actions/actionTypes.js'

const initialState = {
    currentUserData: null,
    signedIn: false
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                currentUserData: action.payload,
                signedIn: true
            }
        }
        default:
            return state;
    }
}

export default users;