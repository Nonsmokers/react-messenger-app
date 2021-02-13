import {SET_MESSAGES_ITEMS} from '../actions/actionTypes.js'

const initialState = {
    items: null
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES_ITEMS: {
            return {
                ...state,
                items: action.payload
            }
        }
        default:
            return state;
    }
}

export default messagesReducer;