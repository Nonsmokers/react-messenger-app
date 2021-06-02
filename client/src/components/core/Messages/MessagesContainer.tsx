import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import socket from "../../../config/socket"
import {MESSAGES_THUNKS} from "../../../redux/actions/messages"
import {Messages} from "./Messages"
import {RootStateType} from '../../../redux/rootReducer'
import {MessageType} from '../../../types/types'

export const MessagesContainer: React.FC = React.memo(
    function MessagesContainer() {

        const items = useSelector(selectMessages)
        const currentUserData = useSelector(selectCurrentUserData)
        const currentDialogId =  useSelector(selectCurrentDialogId)
        const isLoading = useSelector(selectIsLoading)

        const dispatch = useDispatch()

        const fetchAllMessages = (dialogId: string) => dispatch(MESSAGES_THUNKS.fetchAllMessages(dialogId))
        const setNewMessage =  (message: MessageType) => dispatch(MESSAGES_THUNKS.setNewMessage(message))

        const [previewImage, setPreviewImage] = useState(null)

        const messagesRef: any = useRef(null)

        const onNewMessage = (data: MessageType) => {
            setNewMessage(data)
        }

        useEffect(() => {
            messagesRef.current.scrollTo(0, 2000)
        }, [items])

        useEffect(() => {

            if (currentDialogId) {
                fetchAllMessages(currentDialogId)
            }
            socket.on('SERVER:NEW_MESSAGE', onNewMessage)
            socket.on('SERVER:DIALOG_CREATED', onNewMessage)

            return () => {
                // @ts-ignore
                socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage)
                // @ts-ignore
                socket.removeListener('SERVER:DIALOG_CREATED', onNewMessage)
            }
        }, [currentDialogId])

        useEffect(() => {
            messagesRef.current.scrollTo(0, 1111111)
        }, [items])

        return (
            <Messages items={items}
                      currentUserData={currentUserData}
                      blockRef={messagesRef}
                      isLoading={isLoading}
                      setPreviewImage={setPreviewImage}
            />
        )
    })

const selectMessages = (state: RootStateType) => state.messagesReducer.items
const selectCurrentUserData = (state: RootStateType) => state.usersReducer.currentUserData
const selectCurrentDialogId = (state: RootStateType) => state.dialogsReducer.currentDialogId
const selectIsLoading = (state: RootStateType) => state.messagesReducer.isLoading