import React, {useState} from 'react';
import {connect} from 'react-redux';

import filesApi from '../../../api/files';
import ChatInput from "./ChatInput";
import MESSAGES_ACTIONS from "../../../redux/actions/messages";
import ATTACHMENTS_ACTIONS from "../../../redux/actions/attachments";

const ChatInputContainer = ({onSendMessage, currentDialogId, attachments = [], setAttachments, removeAttachment}) => {

    window.navigator.getUserMedia =
        window.navigator.getUserMedia || window.navigator.mozGetUserMedia ||
        window.navigator.msGetUserMedia || window.navigator.webkitGetUserMedia;

    const [value, setValue] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const onRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, onRecording, onError);
        }
    };

    const onRecording = stream => {

        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.start();

        recorder.onstart = () => {
            setIsRecording(true);
        };

        recorder.onstop = () => {
            setIsRecording(false);
        }

        recorder.ondataavailable = async e => {
            const file = new File([e.data], 'audio.webm');

            setLoading(true);
            const data = await filesApi.upload(file)
            await sendAudio(data.data.file._id)
            try{
                setLoading(false);
            }catch (e) {
                console.log(e)
            }
        };

    };

    const onHideRecording = () => {
        setIsRecording(false);
    };

    const onError = err => {
        console.log('The following error occured: ' + err);
    };

    const emojiSelected = (e) => {
        setValue(value + e)
    }

    const sendAudio = audioId => {
        return onSendMessage({
            text: null,
            dialogId: currentDialogId,
            attachments: [audioId],
        });
    };

    const sendMessage = () => {
        if (isRecording) {
            mediaRecorder.stop();
        }

        const trimValue = value.trim()  // delete spaces in message
        if (trimValue.length || attachments.length) {

            onSendMessage({
                text: trimValue,
                dialogId: currentDialogId,
                attachments: attachments.map(file => file.uid),
            });
            setValue('');
            setAttachments([]);
        }
    };

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
            isLoading={isLoading}
            onRecord={onRecord}
            onHideRecording={onHideRecording}
            isRecording={isRecording}
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