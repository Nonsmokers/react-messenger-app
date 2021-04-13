import {SET_MESSAGES_IS_LOADING, SET_MESSAGES_ITEMS, SET_NEW_MESSAGE} from "./actionTypes";
import messagesApi from '../../api/messages';

const MESSAGES_ACTIONS = {

    setMessages: items => ({
        type: SET_MESSAGES_ITEMS,
        payload: items
    }),

    setIsLoading: bool => ({
        type: SET_MESSAGES_IS_LOADING,
        payload: bool
    }),

    setNewMessage: message => (dispatch, getState) => {
        const {dialogsReducer} = getState();
        const {currentDialogId} = dialogsReducer;

        if (currentDialogId && currentDialogId === message.dialog._id) {
            dispatch({
                type: SET_NEW_MESSAGE,
                payload: message
            });
        }
    },

    fetchSendMessage: (text, currentDialogId, attachments) => dispatch => {
        messagesApi.send(text, currentDialogId, attachments);
    },

    fetchAllMessages: (dialogId) => dispatch => {
        dispatch(MESSAGES_ACTIONS.setIsLoading(true))
        messagesApi.getAllByDialogId(dialogId).then(({data}) => {
            dispatch(MESSAGES_ACTIONS.setMessages(data))
        }).catch(() => {
            dispatch(MESSAGES_ACTIONS.setIsLoading(false))
        })
    }

}

export default MESSAGES_ACTIONS;