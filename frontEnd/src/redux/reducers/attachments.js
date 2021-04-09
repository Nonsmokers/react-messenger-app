import {SET_ATTACHMENTS_DATA, REMOVE_ATTACHMENTS_DATA} from '../actions/actionTypes.js'

const initialState = {
    items: []
}

const attachments = (state = initialState, action) => {
    switch (action.type) {
        case SET_ATTACHMENTS_DATA:
            return {
                ...state,
                items: [...state, action.payload]
            }
        case REMOVE_ATTACHMENTS_DATA :
            return {
                ...state,
                items: state.items.filter(item=>item._id !== action.payload)
            }
        default:
            return state;
    }
}

export default attachments;