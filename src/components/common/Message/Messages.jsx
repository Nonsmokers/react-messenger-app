import React from 'react';
import {Spin, Empty} from "antd";
import classNames from "classnames";
import Message from "./Message";
import "./Messages.scss";

const Messages = (props) => {
    return (
        <div className={classNames("messages", {"messages-loading": props.isLoading})}>
            {props.isLoading ?
                <Spin size="large" tip="Загрузка сообщений..."/>
                : (props.items && !props.isLoading ?
                        (props.items.length ?
                                props.items.map(item => <Message key={item._id} {...item} />)
                                : <Empty description="Диалог пуст"/>
                        )
                        : <Empty description="Откройте диалог"/>
                )
            }
        </div>
    );
};

export default Messages;