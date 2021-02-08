import React from 'react';
import className from 'classnames'

import './Message.scss';
import SendingTime from '../SendingTime/SendingTime';
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";

const Message = ({avatar, text, date, isMe, isReaded, attachments, isTyping}) => {
    return (
        <section className={className('message', {
            'message__isme': isMe,
            'message__istyping': isTyping,
            'message__image': attachments && attachments.length === 1,

        })}>
            <div className={'message__content'}>
                <MessageStatusIcon isMe={isMe} isReaded={isReaded}/>
                <div className='message__avatar'>
                    <img src={avatar} alt='avatar'/>
                </div>
                <div className='message__info'>
                    {(text || isTyping) && (
                        <div className='message__bubble'>
                            <p className='message__text'>{text}</p>
                            {isTyping && (
                                <div className='message__typing'>
                                    <span/>
                                    <span/>
                                    <span/>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='message__attachments'>
                        {attachments &&
                        attachments.map((item, i) => (
                            <div key={i} className='message__attachments-item'>
                                <img src={item.url} alt={item.filename}/>
                            </div>
                        ))}
                    </div>
                    {date &&
                    <span className='message__date'>
                        <SendingTime date={date ? date : null}/>
                    </span>}
                </div>
            </div>
        </section>
    );
}

export default Message;