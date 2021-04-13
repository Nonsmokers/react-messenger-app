import React, {useState} from 'react';
import {connect} from 'react-redux';

import filesApi from '../../../api/files';
import ChatInput from "./ChatInput";
import MESSAGES_ACTIONS from "../../../redux/actions/messages";
import ATTACHMENTS_ACTIONS from "../../../redux/actions/attachments";

const ChatInputContainer = ({onSendMessage, currentDialogId, attachments = [], setAttachments, removeAttachment}) => {

    const [value, setValue] = useState("");

    const sendMessage = () => {
        const trimValue = value.trim()
        if (trimValue.length || attachments.length) {

            console.log(trimValue.length)
            onSendMessage({
                text: trimValue,
                dialogId: currentDialogId,
                attachments: attachments.map(file => file.uid),
            });
            setValue('');
            setAttachments([]);
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
    const onSelectFiles = async files => {
        let uploaded = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uid = Math.round(Math.random() * 1000);
            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: 'uploading',
                },
            ];
            setAttachments(uploaded);

            await filesApi.upload(file).then(({data}) => {
                uploaded = uploaded.map(item => {
                    if (item.uid === uid) {
                        return {
                            status: 'done',
                            uid: data.file._id,
                            name: data.file.filename,
                            url: data.file.url,
                        };
                    }
                    return item;
                });
            });
            console.log(uploaded)
        }
        setAttachments(uploaded);
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
            onSelectFiles={onSelectFiles}
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
    onSendMessage: (text, currentDialogId, attachments) => dispatch(MESSAGES_ACTIONS.fetchSendMessage(text, currentDialogId, attachments)),
    removeAttachment: (file) => dispatch(ATTACHMENTS_ACTIONS.removeAttachment(file)),
    setAttachments: (data) => dispatch(ATTACHMENTS_ACTIONS.setAttachments(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInputContainer);