import {combineReducers} from "redux";
import dialogsReducer from "./reducers/dialogsReducer";
import messagesReducer from "./reducers/messagesReducer";

const rootReducer = combineReducers({
    dialogsReducer: dialogsReducer,
    messagesReducer:messagesReducer
});

export default rootReducer;