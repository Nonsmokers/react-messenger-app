import {SET_ATTACHMENTS, REMOVE_ITEM} from '../actions/actionTypes.js'

const initialState = {
    items: []
}

const attachments = (state = initialState, action) => {
    switch (action.type) {
        case SET_ATTACHMENTS:
            return {
                ...state,
                items: action.payload
            }
        case REMOVE_ITEM :
            return {
                ...state,
                items: state.items.filter(item=>item._id !== action.payload)
            }
        default:
            return state;
    }
}

export default attachments;