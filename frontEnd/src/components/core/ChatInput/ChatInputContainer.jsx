import React, {useState} from 'react';
import {connect} from 'react-redux';
import MESSAGES_ACTIONS from "../../../redux/actions/messages";
import ChatInput from "./ChatInput";
import ATTACHMENTS_ACTIONS from "../../../redux/actions/attachments";

const ChatInputContainer = ({onSendMessage, currentDialogId, attachments, removeAttachment}) => {

    const [value, setValue] = useState("");

    const sendMessage = () => {
        if (value !== '') {
            onSendMessage(value, currentDialogId);
            setValue("");
        }
    };

    const emojiSelected = (e) => {
        console.log(value)
        setValue(value + e)
    }

    const handleSendMessage = (e) => {
        if (e.keyCode === 13) {
            sendMessage()
        }
    };

    return (
        <ChatInput
            value={value}
            setValue={setValue}
            handleSendMessage={handleSendMessage}
            sendMessage={sendMessage}
            emojiSelected={emojiSelected}
            attachments={attachments}
            removeAttachment={removeAttachment}

        />
    );
}

const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId;
const selectAttachments = state => state.attachmentsReducer.items;

const mapStateToProps = (state) => ({
    currentDialogId: selectCurrentDialogId(state),
    attachments: selectAttachments(state),
});

const mapDispatchToProps = (dispatch) => ({
    onSendMessage: (text, currentDialogId) => dispatch(MESSAGES_ACTIONS.fetchSendMessage(text, currentDialogId)),
    removeAttachment: () => dispatch(ATTACHMENTS_ACTIONS.removeAttachment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInputContainer);