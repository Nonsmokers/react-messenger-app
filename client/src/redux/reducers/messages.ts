import {MessagesActionsType} from '../actions/messages'
import {MessageType} from '../../types/types'

let initialState = {
    items: [] as Array<MessageType>,
    isLoading: false
}

export type initialStateType = typeof initialState

const messages = (state = initialState, action: MessagesActionsType): initialStateType => {
    switch (action.type) {
        case 'SET_NEW_MESSAGE': {
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        }
        case 'SET_MESSAGES_ITEMS': {
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        }
        case 'SET_MESSAGES_IS_LOADING': {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default:
            return state
    }
}

export default messages