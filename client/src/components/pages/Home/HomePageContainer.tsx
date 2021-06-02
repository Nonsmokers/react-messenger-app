import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {HomePage} from "./HomePage"
import {USER_ACTIONS} from "../../../redux/actions/users"
import {RootStateType} from "../../../redux/rootReducer"

const HomePageContainer: React.FC = () => {

    const currentDialogId = useSelector(selectCurrentDialogId)
    const dispatch = useDispatch()
    const logout = () => dispatch(USER_ACTIONS.logout())

    return (
        <HomePage currentDialogId={currentDialogId}
                  logout={logout}
        />
    )
}

const selectCurrentDialogId = (state: RootStateType) => state.dialogsReducer.currentDialogId

export default HomePageContainer