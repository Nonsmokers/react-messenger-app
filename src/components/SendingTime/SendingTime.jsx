import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

const SendingTime = (props) => (
    formatDistanceToNow(
        new Date(props.date), {addSuffix: true, locale: ruLocale})
)


export default SendingTime;