import React, {useEffect, useRef} from 'react';
import {connect} from "react-redux";
import MESSAGES_ACTIONS from "../../../redux/actions/messages";
import Messages from "./Messages";

const MessagesContainer = ({items, currentDialogId, fetchAllMessages, isLoading}) => {
    const messagesRef = useRef(null)

    useEffect(() => {
        if (currentDialogId) {
            fetchAllMessages(currentDialogId)
        }
    }, [currentDialogId]);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 2000)
    }, [items]);


    return (
        <Messages blockRef={messagesRef}
                  items={items}
                  isLoading={isLoading}
        />
    );
}
const selectMessages = state => state.messagesReducer.items;
const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId;
const selectIsLoading = state => state.messagesReducer.isLoading;

const mapStateToProps = (state) => ({
    items: selectMessages(state),
    currentDialogId: selectCurrentDialogId(state),
    isLoading: selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllMessages: dialogId => dispatch(MESSAGES_ACTIONS.fetchAllMessages(dialogId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);