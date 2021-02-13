import {SET_MESSAGES_ITEMS} from "./actionTypes";
import messagesApi from './../../utils/api/messages';

const actions = {
    setMessages: items => ({
        type: SET_MESSAGES_ITEMS,
        payload: items
    }),
    fetchAllMessages: (dialogId) => dispatch => {
        messagesApi.getAllByDialogId(dialogId).then(({data}) => {
            dispatch(actions.setMessages(data))
        })
    }
}

export default actions;