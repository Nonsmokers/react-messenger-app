import React, {useState} from "react";
import {Button, Input} from "antd";
import {UploadField} from "@navjobs/upload";
import {CameraOutlined, AudioOutlined, SmileOutlined, SendOutlined} from '@ant-design/icons'
import {Picker} from 'emoji-mart'

import "./ChatInput.scss";
import MESSAGES_ACTIONS from "../../../redux/actions/messages";
import {connect} from "react-redux";

//TODO: исправить рендер компоненты при получении сообщения
const ChatInput = ({onSendMessage, currentDialogId}) => {

    const [value, setValue] = useState("");
    const [emojiVisible, setEmojiVisible] = useState(false);

    const toggleEmoji = () => {
        setEmojiVisible(!emojiVisible)
    }

    const handleSendMessage = e => {
        if (e.keyCode === 13) {
            onSendMessage(value, currentDialogId);
            setValue("");
        }
    };

    return (
        <div className="chat-input">
            <div className="chat-input__smile-btn">
                {emojiVisible &&
                <Picker set='apple'
                        style={{position: 'absolute', bottom: '55px', left: '20px', width: '303px'}}
                        title='Pick your emoji' emoji='point_up'
                />}
                <Button type={'link'} shape="circle" icon={<SmileOutlined/>} onClick={toggleEmoji}/>
            </div>
            <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyUp={handleSendMessage}
                size="large"
                placeholder="Введите текст сообщения…"
            />
            <div className="chat-input__actions">
                <UploadField
                    onFiles={files => console.log(files)}
                    containerProps={{
                        className: 'chat-input__actions--upload-btn'
                    }}
                    uploadProps={{
                        accept: '.jpg,.gif,.jpeg,.tiff, .bmp,.png',
                        multiple: 'multiple'
                    }}
                >
                    <Button type={'link'} shape="circle" icon={<CameraOutlined/>}/>
                </UploadField>
                {value ? (
                    <Button type={'link'} shape="circle" icon={<SendOutlined/>}/>
                ) : (
                    <Button type={'link'} shape="circle" icon={<AudioOutlined/>}/>
                )}
            </div>
        </div>
    );
};

const selectCurrentDialogId = state => state.dialogsReducer.currentDialogId;

const mapStateToProps = (state) => ({
    currentDialogId: selectCurrentDialogId(state),
});

const mapDispatchToProps = (dispatch) => ({
    onSendMessage: (text, currentDialogId) => dispatch(MESSAGES_ACTIONS.fetchSendMessage(text, currentDialogId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);

