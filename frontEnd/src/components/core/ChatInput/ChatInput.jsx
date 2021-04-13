import React from "react";
import {UploadField} from "@navjobs/upload";
import {CameraOutlined, AudioOutlined, SendOutlined} from '@ant-design/icons'
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
                       attachments=[],
                       removeAttachment
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
                    autoSize={{maxRows: 3}}
                    onChange={e => setValue(e.target.value)}
                    onKeyUp={handleSendMessage}
                    placeholder="Введите текст сообщения…"
                />
                <div className="chat-input__actions">
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
                    </UploadField>
                    {value ? (
                        <Button type={'link'} shape="circle" onClick={sendMessage} icon={<SendOutlined/>}/>
                    ) : (
                        <Button type={'link'} shape="circle" icon={<AudioOutlined/>}/>
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

