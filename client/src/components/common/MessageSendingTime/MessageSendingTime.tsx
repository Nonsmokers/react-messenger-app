import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru'
import React from 'react'

const MessageSendingTime = (props: any) => (
    <>
        {formatDistanceToNow(
            new Date(props.date), {addSuffix: true, locale: ruLocale})}
    </>
)


export default MessageSendingTime