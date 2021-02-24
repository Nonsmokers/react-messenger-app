import React, {useState} from "react";
import {Button, Input} from "antd";
import {UploadField} from "@navjobs/upload";
import {CameraOutlined, AudioOutlined, SmileOutlined, SendOutlined} from '@ant-design/icons'
import {Picker} from 'emoji-mart'

import "./ChatInput.scss";

const ChatInput = (props) => {

    const [value, setValue] = useState("");
    const [emojiVisible, setEmojiVisible] = useState(false);

    const toggleEmoji = () => {
        setEmojiVisible(!emojiVisible)
    }

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
                onChange={e => setValue(e.target.value)}
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

export default ChatInput;

