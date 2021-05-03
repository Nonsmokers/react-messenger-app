import {combineReducers} from "redux";
import dialogs from "./reducers/dialogs";
import messages from "./reducers/messages";
import users from "./reducers/users";
import attachments from "./reducers/attachments";

const rootReducer = combineReducers({
    dialogsReducer: dialogs,
    messagesReducer: messages,
    usersReducer: users,
    attachmentsReducer: attachments
});

export default rootReducer;