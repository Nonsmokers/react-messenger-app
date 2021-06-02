import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import socket from '../../../config/socket'
import {DIALOGS_THUNKS, DIALOGS_ACTIONS} from "../../../redux/actions/dialogs"
import {Sidebar} from "./Sidebar"
import {RootStateType} from '../../../redux/rootReducer'

export const SidebarContainer: React.FC = () => {

    const items = useSelector(selectDialogs)
    const currentUserData = useSelector(selectCurrentUserData)
    const currentDialogId = useSelector(selectCurrentDialogId)
    const isReady = useSelector(selectCurrentIsReady)

    const dispatch = useDispatch()

    const fetchAllDialogs = () => dispatch(DIALOGS_THUNKS.fetchAllDialogs())

    const setCurrentDialogId = (dialog: string) => dispatch(DIALOGS_ACTIONS.setCurrentDialogId(dialog))

    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState([...items])
    const [currentUserId, setCurrentUserId] = useState('')

    const filterUsersByName = (arr: any[], name: string) => {
        setFiltered(arr.filter((element) => {
            return element.partner.fullname.toLowerCase().includes(name.toLowerCase())
        }))
    }

    useEffect(() => {
        filterUsersByName(items, search)
    }, [search])

    useEffect(() => {
        if (!isReady) {
            fetchAllDialogs()
        }
        setFiltered(items)
        socket.on('SERVER:NEW_MESSAGE', fetchAllDialogs)
        socket.on('SERVER:DIALOG_CREATED', fetchAllDialogs)
        return () => {
            // @ts-ignore
            socket.removeListener('', 'SERVER:NEW_MESSAGE', fetchAllDialogs)
            // @ts-ignore
            socket.removeListener('SERVER:DIALOG_CREATED', fetchAllDialogs)
        }
    }, [items, isReady])

    useEffect(() => {
        if (currentUserData) {
            setCurrentUserId(currentUserData._id)
        }
    }, [currentUserData])

    return (
        <Sidebar filtered={filtered}
                 search={search}
                 setSearch={setSearch}
                 onSelectDialog={setCurrentDialogId}
                 currentDialogId={currentDialogId}
                 currentUserId={currentUserId}
                 currentUserData={currentUserData}
                 isReady={isReady}
        />
    )
}

const selectDialogs = (state: RootStateType) => state.dialogsReducer.items
const selectCurrentDialogId = (state: RootStateType) => state.dialogsReducer.currentDialogId
const selectCurrentUserData = (state: RootStateType) => state.usersReducer.currentUserData
const selectCurrentIsReady = (state: RootStateType) => state.dialogsReducer.isReady