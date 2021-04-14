import React from "react";
import {UploadField} from "@navjobs/upload";
import {CameraOutlined, AudioOutlined, SendOutlined, LoadingOutlined, AudioMutedOutlined} from '@ant-design/icons'
import {Button, Input} from 'antd';


import "./ChatInput.scss";
import EmojiInput from "../../common/Emoji/Emoji";
import UploadFile from "../../common/UploadFile/UploadFile";

//TODO: исправить рендер компоненты при получении сообщения

const ChatInput = ({
                       handleSendMessage,
                       onSelectFiles,
                       sendMessage,
                       value,
                       setValue,
                       emojiSelected,
                       attachments = [],
                       removeAttachment,
                       isLoading,
                       onRecord,
                       onHideRecording,
                       isRecording
                   }) => {

    const {TextArea} = Input;

    return (
        <>
            <div className="chat-input">
                <div className="chat-input__smile-btn">
                    <EmojiInput emojiSelected={emojiSelected}/>
                </div>
                <TextArea
                    value={value}
                    disabled={!!isRecording}
                    autoSize={{maxRows: 3}}
                    onChange={e => setValue(e.target.value)}
                    onKeyUp={handleSendMessage}
                    placeholder={isRecording ? "   Голосовое сообщение..." : "Введите текст сообщения…"}
                />
                <div className="chat-input__actions">
                    {isRecording ? (
                        <>
                            <div className="chat-input__actions-record--dot"/>
                            <Button onClick={onHideRecording} type={"link"} shape="circle" icon={<AudioMutedOutlined/>}/>
                        </>
                    ) : (
                        <UploadField
                            onFiles={onSelectFiles}
                            containerProps={{
                                className: 'chat-input__actions--upload-btn'
                            }}
                            uploadProps={{
                                accept: '.jpg,.gif,.jpeg, .bmp,.png',
                                multiple: 'multiple'
                            }}
                        >
                            <Button type={'link'} shape="circle" icon={<CameraOutlined/>}/>
                        </UploadField>)}

                    {isLoading ? (
                        <Button type="link" shape="circle" icon={<LoadingOutlined/>}/>
                    ) : isRecording || value || attachments.length ? (
                        <Button onClick={sendMessage} type={'link'} shape="circle" icon={<SendOutlined/>}/>
                    ) : (
                        <div className="chat-input__record-btn">
                            <Button onClick={onRecord} place type={"link"} shape="circle" icon={<AudioOutlined/>}/>
                        </div>
                    )}
                </div>

            </div>
            <div className="chat-input__attachments">
                {attachments.length > 0 && (
                    <UploadFile
                        removeAttachment={removeAttachment}
                        attachments={attachments}
                    />)}
            </div>
        </>
    );
};

export default ChatInput;

