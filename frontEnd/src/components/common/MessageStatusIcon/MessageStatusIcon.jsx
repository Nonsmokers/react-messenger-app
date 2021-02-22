import React from 'react';
import messageReaded from '../../../assets/img/messageReaded.svg';
import messageNotReaded from '../../../assets/img/messageNotReaded.svg';

const MessageStatusIcon = ({isMe, isReaded}) => {
    return (
        isMe && isReaded ?
            <img className='message__icon-readed'
                 src={messageReaded}
                 alt='checked icon'
            />
            :
            <img className='message__icon-readed message__icon-readed--no'
                 src={messageNotReaded}
                 alt='checked icon'
            />
    );
}

export default MessageStatusIcon;