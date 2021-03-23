import React, {useEffect, useRef} from 'react';
import {connect} from "react-redux";
import MESSAGES_ACTIONS from "../../../redux/actions/messages";
import Messages from "./Messages";

const MessagesContainer = (props) => {
    const messagesRef = useRef(null)

    useEffect(() => {
        if (props.currentDialogId) {
            props.fetchAllMessages(props.currentDialogId)
        }
    }, [props.currentDialogId]);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 2000)
    }, [props.items]);


    return (
        <Messages blockRef={messagesRef} items={props.items} isLoading={props.isLoading}/>
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