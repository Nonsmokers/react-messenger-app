import {SET_MESSAGES_IS_LOADING, SET_MESSAGES_ITEMS} from "./actionTypes";
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
/*    addMessage: message => (dispatch, getState) => {
        const { dialogsReducer } = getState();
        console.log(message.dialog._id)
        const { currentDialogId } = dialogsReducer;

        if (currentDialogId === message.dialog._id) {
            dispatch({
                type: "ADD_MESSAGE",
                payload: message
            });
        }
    },*/
    fetchAllMessages: (dialogId) => dispatch => {
        dispatch(MESSAGES_ACTIONS.setIsLoading(true))
        messagesApi.getAllByDialogId(dialogId).then(({data}) => {
            dispatch(MESSAGES_ACTIONS.setMessages(data))
            dispatch(MESSAGES_ACTIONS.setIsLoading(false))
        }).catch(() => {
            dispatch(MESSAGES_ACTIONS.setIsLoading(false))
        })
    }
}

export default MESSAGES_ACTIONS;