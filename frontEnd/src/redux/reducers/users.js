import {SET_USER_DATA} from '../actions/actionTypes.js'

const initialState = {
    items: null
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                items: action.payload
            }
        }
        default:
            return state;
    }
}

export default users;