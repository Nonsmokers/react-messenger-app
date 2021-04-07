import "emoji-mart/css/emoji-mart.css";
import React, {useState, useCallback, useEffect} from "react";
import {Picker} from "emoji-mart";
import {Button} from "antd";
import {SmileOutlined} from "@ant-design/icons";

const EmojiInput = ({emojiSelected}) => {

    const [showPicker, setPickerState] = useState(false);

    const dismissPicker = useCallback(() => {
        setPickerState(false);
    }, [setPickerState]);

    const togglePicker = () => {
        setPickerState(!showPicker);
    };

    const addEmoji = (emoji) => {
        if ("native" in emoji) {
            emojiSelected(`${emoji.native}`);
            dismissPicker();
        }
    };

    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setPickerState(false);
        }
    };

    useEffect(() => {
        const el = document.querySelector('.chat-input__smile-btn');
        document.addEventListener('click', handleOutsideClick.bind(this, el));
        return () => {
            document.removeEventListener('click', handleOutsideClick.bind(this, el));
        };
    }, []);

    return (
        <div>
            {showPicker &&
            <Picker set='apple' onSelect={addEmoji}
                    style={{position: 'absolute', bottom: '55px', left: '20px', width: '303px'}}
                    title='Pick your emoji' emoji='point_up'
            />}
            <Button onClick={togglePicker} type={'link'} shape="circle" icon={<SmileOutlined/>}/>
        </div>
    )
}

export default EmojiInput