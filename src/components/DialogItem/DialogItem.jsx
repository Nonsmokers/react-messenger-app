import React from 'react';
import './DialogItem.scss';
import classnames from 'classnames';
import MessageStatusIcon from '../MessageStatusIcon/MessageStatusIcon';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';

const getMessage = (sendingDate) => {
    if (isToday(sendingDate)) {
        return format(sendingDate, 'HH:mm');
    } else {
        return format(sendingDate, 'dd.mm.yy')
    }
}

const DialogItem = (props) => {
    return (
        <div className={classnames('dialogs__item', {'dialogs__item--online': props.message.user.isOnline})}>
            <div className={'dialogs__item-avatar'}>
                <img
                    src={props.message.user.avatar}
                    alt={'user avatar'}/>
            </div>
            <div className='dialogs__item--info'>
                <div className='dialogs__item--info-title'>
                    <b>{props.message.user.fullName}</b>
                    <span>
                        {getMessage(props.message.sendingTime)}
                    </span>
                </div>
                <div className='dialogs__item--info-bottom'>
                    <p>{props.message.text}</p>
                    {props.unReaded > 0 ?
                        <MessageStatusIcon isMe={props.isMe} isReaded={false}/> :
                        <div className={'dialogs__item--info-bottom-count'}>{props.unReaded}</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default DialogItem;