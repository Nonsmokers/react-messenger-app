import {SET_DIALOGS_ITEMS, SET_CURRENT_DIALOG_ID} from '../actions/actionTypes.js'

const initialState = {
    isReady: false,
    items: [],
    currentDialogId: null,
}

const dialogs = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIALOGS_ITEMS: {
            return {
                ...state,
                items: action.payload,
                isReady: true
            }
        }
        case SET_CURRENT_DIALOG_ID: {
            return {
                ...state,
                currentDialogId: action.payload,
            }
        }
        default:
            return state;
    }
}

export default dialogs;