import React, {useEffect, useRef} from 'react';
import {connect} from "react-redux";
import socket from "../../../config/socket";
import MESSAGES_ACTIONS from "../../../redux/actions/messages";
import Messages from "./Messages";

const MessagesContainer = React.memo(
    function MessagesContainer({items, currentUserData, setNewMessage, currentDialogId, fetchAllMessages, isLoading}) {
        const messagesRef = useRef(null)

        const onNewMessage = (data) => {
            setNewMessage(data)
        }

        useEffect(() => {
            messagesRef.current.scrollTo(0, 2000)
        }, [items]);

        useEffect(() => {
            if (currentDialogId) {
                fetchAllMessages(currentDialogId)
            }

            socket.on('SERVER:NEW_MESSAGE', onNewMessage)
            socket.on('SERVER:DIALOG_CREATED', onNewMessage)

            return () => {
                socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage)
                socket.removeListener('SERVER:DIALOG_CREATED', onNewMessage)
            }
        }, [currentDialogId]);

        useEffect(() => {
            messagesRef.current.scrollTo(0, 2000)
        }, [items]);

        return (
            <Messages items={items}
                      currentUserData={currentUserData}
                      blockRef={messagesRef}
                      isLoading={isLoading}
            />
        );
    })
const selectMessages = state => state.messagesReducer.items;
const selectCurrentUserData = state => state.usersReducer.currentUserData;
const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId;
const selectIsLoading = state => state.messagesReducer.isLoading;

const mapStateToProps = (state) => ({
    items: selectMessages(state),
    currentUserData: selectCurrentUserData(state),
    currentDialogId: selectCurrentDialogId(state),
    isLoading: selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllMessages: dialogId => dispatch(MESSAGES_ACTIONS.fetchAllMessages(dialogId)),
    setNewMessage: dialogId => dispatch(MESSAGES_ACTIONS.setNewMessage(dialogId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);