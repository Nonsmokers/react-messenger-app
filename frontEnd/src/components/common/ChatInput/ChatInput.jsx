import React, {useState} from "react";
import {Button, Input} from "antd";
import {CameraOutlined, AudioOutlined, SmileOutlined, SendOutlined} from '@ant-design/icons'

import "./ChatInput.scss";

const ChatInput = (props) => {

    const [value, setValue] = useState("");

    return (
        <div className="chat-input">
            <div className="chat-input__smile-btn">
                <Button type={'link'} shape="circle" icon={<SmileOutlined/>}/>
            </div>
            <Input
                onChange={e => setValue(e.target.value)}
                size="large"
                placeholder="Введите текст сообщения…"
            />
            <div className="chat-input__actions">
                <Button type={'link'} shape="circle" icon={<CameraOutlined/>}/>
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

