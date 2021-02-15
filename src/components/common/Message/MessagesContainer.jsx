import React, {useEffect} from 'react';
import {connect} from "react-redux";
import actions from "../../../redux/actions/messages";
import Messages from "./Messages";

const MessagesContainer = (props) => {

    useEffect(() => {
        if (props.currentDialogId) {
            props.fetchAllMessages(props.currentDialogId)
        }
    }, [props.currentDialogId]);

    return (
        <Messages items={props.items} isLoading={props.isLoading}/>
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
    fetchAllMessages: dialogId => dispatch(actions.fetchAllMessages(dialogId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);