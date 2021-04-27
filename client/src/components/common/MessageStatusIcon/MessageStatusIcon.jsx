import React from 'react';
import messageReaded from '../../../assets/img/messageReaded.svg';
import messageNotReaded from '../../../assets/img/messageNotReaded.svg';

const MessageStatusIcon = ({isMe, unread}) => {
    return (
        isMe && unread ?
            <img className='message__icon-readed message__icon-readed--no'
                 src={messageNotReaded}
                 alt='checked icon'
            />
            :
            <img className='message__icon-readed'
                 src={messageReaded}
                 alt='checked icon'
            />

    );
}

export default MessageStatusIcon;