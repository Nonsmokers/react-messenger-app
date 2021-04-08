import React from 'react';
import className from 'classnames'
import './MessageItem.scss';
import MessageStatusIcon from "../../common/MessageStatusIcon/MessageStatusIcon";
import MessageSendingTime from "../../common/MessageSendingTime/MessageSendingTime";
import MessageAudio from "./MessageAudio/MessageAudio";
import Avatar from "../../common/Avatar/Avatar";
import {Button, Popover} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";

const MessageItem = ({sender, text, audio, isMe, unread, attachments, isTyping, sendingTime}) => {

    const content = (
        <>
            <div><Button>Изменить сообщения</Button></div>
            <div><Button>Копировать текст</Button></div>
            <div><Button>Удалить сообщения</Button></div>
            <div><Button>Выделить сообщения</Button></div>
        </>
    )
    return (
        <section className={className('message', {
            'message__isme': isMe,
            'message__istyping': isTyping,
            'message__isaudio': audio,
            'message__isimage': attachments && attachments.length === 1,
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
                        {attachments.map((item, i) => (
                            <div key={i} className='message__attachments-item'>
                                <img src={item.url} alt={item.filename}/>
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