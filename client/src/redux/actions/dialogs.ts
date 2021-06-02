import dialogsApi from '../../api/dialogs'
import {BaseThunkType, InferActionsTypes} from '../rootReducer'
import {DialogType} from '../../types/types'

export type DialogsActionsType = InferActionsTypes<typeof DIALOGS_ACTIONS>

export const DIALOGS_ACTIONS = {

    setDialogs: (items: Array<DialogType>) => ({type: 'SET_DIALOGS_ITEMS', payload: items} as const),
    setCurrentDialogId: (id: string) => ({type: 'SET_CURRENT_DIALOG_ID', payload: id} as const)
}

type ThunkType = BaseThunkType<DialogsActionsType>

export const DIALOGS_THUNKS = {

    fetchAllDialogs: (): ThunkType => async (dispatch) => {
        const response = await dialogsApi.getAll()
        dispatch(DIALOGS_ACTIONS.setDialogs(response.data))
    }
}

