import React, {SetStateAction, Dispatch} from 'react'
import {Spin, Empty} from "antd"
// @ts-ignore
import classNames from "classnames"
import MessageItem from "./MessageItem"
import "./Messages.scss"
import {MessageType, UserType} from '../../../types/types'

type PropsType = {
    items: Array<MessageType>
    currentUserData: null | UserType
    blockRef: any
    isLoading: boolean
    setPreviewImage: Dispatch<SetStateAction<null>>
}

export const Messages: React.FC<PropsType> = ({items, currentUserData, blockRef, isLoading, setPreviewImage}) => {
    return (
        <div
            ref={blockRef}
            className={classNames("messages", {"messages-loading": isLoading})}>
            {isLoading
                ? <Spin size="large" tip="Загрузка сообщений..."/>
                : (items && !isLoading
                    ? (items.length
                            ? items.map((item) =>
                                <MessageItem {...item}
                                             setPreviewImage={setPreviewImage}
                                             isMe={currentUserData && currentUserData._id === item.sender._id}
                                             key={item._id}
                                             audio={''}
                                             sendingTime={''}
                                             isTyping={false}
                                />)
                            : <Empty description="Диалог пуст"/>
                    ) : <Empty description="Откройте диалог"/>
                )
            }
        </div>
    )
}