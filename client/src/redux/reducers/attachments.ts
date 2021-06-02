import {AttachmentsActionsType} from '../actions/attachments'
import {AttachmentType} from '../../types/types'

let initialState = {
    items: [] as Array<AttachmentType>,
    isReady: false
}

export type InitialStateType = typeof initialState

const attachments = (state = initialState, action: AttachmentsActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_ATTACHMENTS':
            return {
                ...state,
                items: action.payload,
            }
        case 'REMOVE_ITEM' :
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }
        default:
            return state
    }
}

export default attachments