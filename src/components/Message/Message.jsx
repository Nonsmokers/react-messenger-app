import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';
import './Message.scss';

const Message = ({avatar, user, text, date}) => {
    return (
        <section className='message'>
            <div className='message__avatar'>
                <img src={avatar} alt='avatar'/>
            </div>
            <div className='message__content'>
                <div className='message__bubble'>
                    <p className='message__text'>{text}</p>
                </div>
                <span className='message__date'>{formatDistanceToNow(
                    new Date(date), {addSuffix: true, locale: ruLocale})}</span>
            </div>
        </section>
    );
}

export default Message;