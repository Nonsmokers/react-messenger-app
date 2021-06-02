import {Action, combineReducers} from "redux"
import dialogs from "./reducers/dialogs"
import messages from "./reducers/messages"
import users from "./reducers/users"
import attachments from "./reducers/attachments"
import {ThunkAction} from 'redux-thunk'

const rootReducer = combineReducers({
    dialogsReducer: dialogs,
    messagesReducer: messages,
    usersReducer: users,
    attachmentsReducer: attachments
})

export type RootStateType = ReturnType<typeof rootReducer>

export type BaseThunkType<A extends Action, R = void> = ThunkAction<R, RootStateType, unknown, A>

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export default rootReducer