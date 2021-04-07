import React from "react";
import {UploadField} from "@navjobs/upload";
import {CameraOutlined, AudioOutlined, SendOutlined} from '@ant-design/icons'
import { Button, Input } from 'antd';


import "./ChatInput.scss";
import EmojiInput from "../../common/Emoji/Emoji";

//TODO: исправить рендер компоненты при получении сообщения

const ChatInput = ({handleSendMessage, sendMessage, value, setValue, emojiSelected}) => {

    const { TextArea } = Input;

    return (
        <div className="chat-input">
            <div className="chat-input__smile-btn">
                <EmojiInput emojiSelected={emojiSelected}/>
            </div>
            <TextArea
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
                    <Button type={'link'} shape="circle" onClick={sendMessage} icon={<SendOutlined/>}/>
                ) : (
                    <Button type={'link'} shape="circle" icon={<AudioOutlined/>}/>
                )}
            </div>
        </div>
    );
};

export default ChatInput;

