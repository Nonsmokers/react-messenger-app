import React, {useState} from 'react';
import {connect} from 'react-redux';
import MESSAGES_ACTIONS from "../../../redux/actions/messages";
import ChatInput from "./ChatInput";

const ChatInputContainer = ({onSendMessage, currentDialogId}) => {

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
        />
    );
}

const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId;

const mapStateToProps = (state) => ({
    currentDialogId: selectCurrentDialogId(state),
});

const mapDispatchToProps = (dispatch) => ({
    onSendMessage: (text, currentDialogId) => dispatch(MESSAGES_ACTIONS.fetchSendMessage(text, currentDialogId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInputContainer);