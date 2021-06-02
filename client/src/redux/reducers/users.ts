import {UserActionsType} from '../actions/users'
import {UserType} from '../../types/types'

const initialState = {
    currentUserData: null as UserType | null,
    token: window.localStorage.token as string,
    signedIn: !!window.localStorage.token
}

export type InitialStateType = typeof initialState

const users = (state = initialState, action: UserActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                currentUserData: action.payload,
                token: window.localStorage.token,
                signedIn: true
            }
        case 'SET_USER_LOGOUT' :
            return {
                ...state,
                currentUserData: null,
                token: '',
                signedIn: false
            }
        default:
            return state
    }
}

export default users