import React from 'react';
import className from 'classnames'
import './MessageItem.scss';
import MessageStatusIcon from "../../common/MessageStatusIcon/MessageStatusIcon";
import MessageSendingTime from "../../common/MessageSendingTime/MessageSendingTime";
import MessageAudio from "./MessageAudio/MessageAudio";
import Avatar from "../../common/Avatar/Avatar";
import {Button, Image, Popover} from "antd";
import EllipsisOutlined from "@ant-design/icons";
import isAudio from "../../../utils/isAudio";

const MessageItem = ({sender, text, audio, isMe, unread, attachments, isTyping, sendingTime, setPreviewImage}) => {

    const content = (
        <>
            <div><Button>Изменить сообщения</Button></div>
            <div><Button>Копировать текст</Button></div>
            <div><Button>Удалить сообщения</Button></div>
            <div><Button>Выделить сообщения</Button></div>
        </>
    )

    const renderAttachment = (item) => {
        if (item.ext !== 'webm') {
            return (
                <div
                    onClick={() => setPreviewImage(item.url)}
                    className="message__attachments-item">
                    <Image src={item.url} alt={item.filename}/>
                </div>
            );
        } else {
            return (
                <div className='message__bubble'>
                    <MessageAudio key={item._id} audioSrc={item.url}/>
                </div>)
        }
    };

    return (
        <section className={className('message', {
            'message__isme': isMe,
            'message__istyping': isTyping,
            'message__isaudio': isAudio(attachments),
            'message__isimage': !isAudio(attachments) && attachments.length === 1 && !text,
        })}>
            <div className={'message__content'}>
                <MessageStatusIcon isMe={isMe} unread={unread}/>
                <Popover trigger="click" title="Title" content={content}>
                    <div className="message__icon-actions">
                        <Button type={'link'} shape="circle" icon={<EllipsisOutlined/>}/>
                    </div>
                </Popover>
                <div className='message__avatar'>
                    <Avatar user={sender}/>
                </div>
                <div className='message__info'>
                    {(audio || text || isTyping) && (
                        <div className='message__bubble'>
                            <p className='message__text'>{text}</p>
                            {isTyping && (
                                <div className='message__typing'>
                                    <span/>
                                    <span/>
                                    <span/>
                                </div>
                            )}
                            {audio && <MessageAudio audio={audio}/>}
                        </div>
                    )}
                    {attachments &&
                    <div className='message__attachments'>
                        {attachments.map((item) => (
                            <div key={item._id}>
                                {renderAttachment(item)}
                            </div>
                        ))}
                    </div>}
                    {sendingTime &&
                    <span className='message__date'>
                        <MessageSendingTime date={sendingTime ? sendingTime : null}/>
                    </span>}
                </div>
            </div>
        </section>
    );
}

export default MessageItem;