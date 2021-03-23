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
    fetchAllDialogs: () => dispatch => {
        dialogsApi.getAll().then(({data}) => {
            console.log(data)
            dispatch(DIALOGS_ACTIONS.setDialogs(data))
        })
    }
}

export default DIALOGS_ACTIONS;