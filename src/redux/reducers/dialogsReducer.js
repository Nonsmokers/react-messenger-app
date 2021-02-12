import {SET_DIALOGS_ITEMS} from '../actions/actionTypes.js'

const initialState = {
    items: []
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIALOGS_ITEMS: {
            return {
                ...state,
                items: action.payload,
                isReady: true
            }
        }
        default:
            return state;
    }
}

export default dialogsReducer;