import {SET_MESSAGES_ITEMS, SET_MESSAGES_IS_LOADING, SET_NEW_MESSAGE} from '../actions/actionTypes.js'

const initialState = {
    items: null,
    isLoading: false
}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_MESSAGE: {
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        }
        case SET_MESSAGES_ITEMS: {
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        }
        case SET_MESSAGES_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default:
            return state;
    }
}

export default messages;