import React from 'react';
import {Spin, Empty} from "antd";
import classNames from "classnames";
import MessageItem from "./MessageItem";
import "./Messages.scss";

const Messages = (props) => {
    return (
        <div
            ref={props.blockRef}
            className={classNames("messages", {"messages-loading": props.isLoading})}>
            {props.isLoading ?
                <Spin size="large" tip="Загрузка сообщений..."/>
                : (props.items && !props.isLoading ?
                        (props.items.length ?
                                props.items.map(item => <MessageItem key={item._id} {...item} />)
                                : <Empty description="Диалог пуст"/>
                        )
                        : <Empty description="Откройте диалог"/>
                )
            }
        </div>
    );
};

export default Messages;