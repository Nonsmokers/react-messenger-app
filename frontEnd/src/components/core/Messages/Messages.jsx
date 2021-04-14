import React from 'react';
import {Spin, Empty} from "antd";
import classNames from "classnames";
import MessageItem from "./MessageItem";
import "./Messages.scss";

const Messages = ({items, currentUserData, blockRef, isLoading, setPreviewImage}) => {
    return (
        <div
            ref={blockRef}
            className={classNames("messages", {"messages-loading": isLoading})}>
            {isLoading
                ? <Spin size="large" tip="Загрузка сообщений..."/>
                : (items && !isLoading
                        ? (items.length
                                ? items.map(item =>
                                    <MessageItem key={item._id}
                                                 {...item}
                                                 setPreviewImage={setPreviewImage}
                                                 isMe={currentUserData._id === item.sender._id}/>)
                                : <Empty description="Диалог пуст"/>
                        ) : <Empty description="Откройте диалог"/>
                )
            }
        </div>
    );
};

export default Messages;