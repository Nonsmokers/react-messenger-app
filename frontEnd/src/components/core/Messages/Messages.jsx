import React from 'react';
import {Spin, Empty} from "antd";
import classNames from "classnames";
import MessageItem from "./MessageItem";
import "./Messages.scss";

const Messages = ({blockRef, isLoading, items}) => {
    return (
        <div
            ref={blockRef}
            className={classNames("messages", {"messages-loading": isLoading})}>
            {isLoading
                ? <Spin size="large" tip="Загрузка сообщений..."/>
                : (items && !isLoading
                        ? (items.length
                                ? items.map(item => <MessageItem key={item._id} {...item} />)
                                : <Empty description="Диалог пуст"/>
                        ) : <Empty description="Откройте диалог"/>
                )
            }
        </div>
    );
};

export default Messages;