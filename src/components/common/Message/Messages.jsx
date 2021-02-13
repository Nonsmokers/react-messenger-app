import React from 'react';
import {Empty} from "antd";

import Message from "./Message";

const Messages = (props) => (
    props.items ?
        <>
            {props.items.map(item => (
                <Message {...item}/>
            ))}
        </>
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Откройте диалог"/>
)

export default Messages;