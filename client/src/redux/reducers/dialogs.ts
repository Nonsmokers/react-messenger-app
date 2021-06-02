import {DialogsActionsType} from '../actions/dialogs'
import {DialogType} from '../../types/types'

let initialState = {
    items: [] as Array<DialogType>,
    currentDialogId: null as string | null,
    isReady: false
}

export type InitialStateType = typeof initialState

const dialogs = (state = initialState, action: DialogsActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_DIALOGS_ITEMS': {
            return {
                ...state,
                items: action.payload,
                isReady: true
            }
        }
        case 'SET_CURRENT_DIALOG_ID': {
            return {
                ...state,
                currentDialogId: action.payload,
            }
        }
        default:
            return state
    }
}

export default dialogs