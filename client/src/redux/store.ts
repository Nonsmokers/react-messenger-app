import {applyMiddleware, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "./rootReducer"

let store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
    )
)

declare global {
    interface Window {
        store: typeof store
    }
}

window.store = store

export default store