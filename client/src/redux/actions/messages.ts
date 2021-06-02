import messagesApi from '../../api/messages'
import {BaseThunkType, InferActionsTypes} from '../rootReducer'
import {MessageType} from '../../types/types'
import {SendMessageType} from '../../components/core/ChatInput/ChatInputContainer'

export type MessagesActionsType = InferActionsTypes<typeof MESSAGES_ACTIONS>

export const MESSAGES_ACTIONS = {
    setMessages: (items: Array<MessageType>) => ({type: 'SET_MESSAGES_ITEMS', payload: items} as const),
    createNewMessage: (message: any) => ({type: 'SET_NEW_MESSAGE', payload: message} as const),
    setIsLoading: (bool: boolean) => ({type: 'SET_MESSAGES_IS_LOADING', payload: bool} as const)
}

type ThunkType = BaseThunkType<MessagesActionsType>

export const MESSAGES_THUNKS = {
    setNewMessage: (message: MessageType): ThunkType => (dispatch, getState) => {
        const {dialogsReducer} = getState()
        const {currentDialogId} = dialogsReducer

        console.log(message)
        if (currentDialogId && currentDialogId === message.dialog._id) {
            dispatch(MESSAGES_ACTIONS.createNewMessage(message));
        }
    },
    fetchSendMessage: (data: SendMessageType): ThunkType => (dispatch) => {
        messagesApi.send(data.text, data.dialogId, data.attachments)
    },
    fetchAllMessages: (dialogId: string): ThunkType => async (dispatch) => {
        dispatch(MESSAGES_ACTIONS.setIsLoading(true))
        let response = await messagesApi.getAllByMessages(dialogId)
        try {
            dispatch(MESSAGES_ACTIONS.setMessages(response))
        } catch {
            dispatch(MESSAGES_ACTIONS.setIsLoading(false))
        }
    }
}