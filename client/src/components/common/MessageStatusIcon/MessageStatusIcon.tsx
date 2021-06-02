import React from 'react'
import messageReadied from '../../../assets/img/messageReaded.svg'
import messageNotReadied from '../../../assets/img/messageNotReaded.svg'

type PropsType = {
    isMe: boolean| null
    unread: boolean
}

const MessageStatusIcon: React.FC<PropsType> = ({isMe, unread}) => {
    return (
        isMe && unread ?
            <img className='message__icon-readed message__icon-readed--no'
                 src={messageNotReadied}
                 alt='checked icon'
            />
            :
            <img className='message__icon-readed'
                 src={messageReadied}
                 alt='checked icon'
            />

    )
}

export default MessageStatusIcon