import React from 'react';
import className from 'classnames'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

import messageReaded from '../../assets/img/messageReaded.svg';
import messageNotReaded from '../../assets/img/messageNotReaded.svg';
import './Message.scss';

const Message = ({avatar, text, date, isMe, isReaded, attachments}) => {
    return (
        <section className={className('message', {'message__isme': isMe})}>
            <div className={'message__content'}>
                {isMe && isReaded ?
                    <img className='message__icon-readed'
                         src={messageReaded}
                         alt="checked icon"/>
                    :
                    <img className='message__icon-readed message__icon-readed--no'
                         src={messageNotReaded}
                         alt="checked icon"/>
                }
                <div className='message__avatar'>
                    <img src={avatar} alt='avatar'/>
                </div>
                <div className='message__info'>
                    <div className='message__bubble'>
                        <p className='message__text'>{text}</p>
                    </div>
                    <div className="message__attachments">
                        {attachments &&
                        attachments.map(item => (
                            <div className="message__attachments-item">
                                <img src={item.url} alt={item.filename}/>
                            </div>
                        ))}
                    </div>
                    <span className='message__date'>{formatDistanceToNow(
                        new Date(date), {addSuffix: true, locale: ruLocale})}
                </span>
                </div>
            </div>
        </section>
    );
}

export default Message;

/*
const Message = ({avatar, user, text, date, isMe, isReaded, attachments, isTyping}) => (
    <div
        className={classNames("message", {
            "message--isme": isMe,
            "message--is-typing": isTyping,
            "message--image": attachments && attachments.length === 1
        })}
    >
        <div className="message__content">
            <IconReaded isMe={isMe} isReaded={isReaded}/>
            <div className="message__avatar">
                <img src={avatar} alt={`Avatar ${user.fullname}`}/>
            </div>
            <div className="message__info">
                {(text || isTyping) && (
                    <div className="message__bubble">
                        {text && <p className="message__text">{text}</p>}
                    </div>
                )}
                <div className="message__attachments">
                    {attachments &&
                    attachments.map(item => (
                        <div className="message__attachments-item">
                            <img src={item.url} alt={item.filename}/>
                        </div>
                    ))}
                </div>
                {date && (
                    <span className="message__date">
                        <Time date={date}/>
                    </span>
                )}
            </div>
        </div>
    </div>
);*/
