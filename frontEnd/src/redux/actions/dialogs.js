import {SET_CURRENT_DIALOG_ID, SET_DIALOGS_ITEMS} from "./actionTypes";
import dialogsApi from '../../api/dialogs';

const DIALOGS_ACTIONS = {
    setDialogs: items => ({
        type: SET_DIALOGS_ITEMS,
        payload: items
    }),
    setCurrentDialogId: id => ({
        type: SET_CURRENT_DIALOG_ID,
        payload: id
    }),
    fetchAllDialogs: () => async dispatch => {
        const response = await dialogsApi.getAll()
        console.log(response)
        dispatch(DIALOGS_ACTIONS.setDialogs(response))
    }
}

export default DIALOGS_ACTIONS;