import {SET_MESSAGES_IS_LOADING, SET_MESSAGES_ITEMS} from "./actionTypes";
import messagesApi from './../../utils/api/messages';

const actions = {
    setMessages: items => ({
        type: SET_MESSAGES_ITEMS,
        payload: items
    }),
    setIsLoading: bool => ({
        type: SET_MESSAGES_IS_LOADING,
        payload: bool
    }),
    fetchAllMessages: (dialogId) => dispatch => {
        dispatch(actions.setIsLoading(true))
        messagesApi.getAllByDialogId(dialogId).then(({data}) => {
            dispatch(actions.setMessages(data))
            dispatch(actions.setIsLoading(false))
        }).catch(() => {
            dispatch(actions.setIsLoading(false))
        })
    }
}

export default actions;