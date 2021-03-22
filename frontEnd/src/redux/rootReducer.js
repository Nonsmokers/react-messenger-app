import {combineReducers} from "redux";
import dialogs from "./reducers/dialogs";
import messages from "./reducers/messages";
import users from "./reducers/users";

const rootReducer = combineReducers({
    dialogsReducer: dialogs,
    messagesReducer: messages,
    usersReducer: users
});

export default rootReducer;