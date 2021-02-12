import {SET_DIALOGS_ITEMS} from "./actionTypes";
import dialogsApi from './../../utils/api/dialogs';

const actions = {
    setDialogs: items => ({
        type: SET_DIALOGS_ITEMS,
        payload: items
    }),
    fetchAllDialogs: () => dispatch => {
        dialogsApi.getAll().then(({data}) => {
            console.log(data)
            dispatch(actions.setDialogs(data))
        })
    }
}

export default actions;