import {combineReducers} from "redux";
import dialogsReducer from "./reducers/dialogsReducer";

const rootReducer = combineReducers({
    dialogsReducer: dialogsReducer
});

export default rootReducer;