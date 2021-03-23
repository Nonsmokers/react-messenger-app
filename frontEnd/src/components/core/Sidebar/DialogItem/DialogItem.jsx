import React from 'react';
import classnames from 'classnames';
import MessageStatusIcon from '../../../common/MessageStatusIcon/MessageStatusIcon';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import Avatar from "../../../common/Avatar/Avatar";

const getMessage = (sendingDate) => {
    if (isToday(sendingDate)) {
        return format(sendingDate, 'HH:mm');
    } else {
        return format(sendingDate, 'dd.mm.yy')
    }
}

const DialogItem = (props) => {
    return (
        <div className={classnames('dialogs__item', {
            'dialogs__item--online': props.user.isOnline,
            'dialogs__item--selected': props.currentDialogId === props._id
        })}
             onClick={props.onSelectDialog.bind(this, props._id)}
        >
            <div className={'dialogs__item-avatar'}>
                <Avatar user={props.user}/>
            </div>
            <div className='dialogs__item--info'>
                <div className='dialogs__item--info-title'>
                    <b>{props.user.fullname}</b>
                    <span>
                        {getMessage(new Date(props.sendingTime))}
                    </span>
                </div>
                <div className='dialogs__item--info-bottom'>
                    <p>{props.text}</p>
                    {props.unReaded > 0 ?
                        <div className={'dialogs__item--info-bottom-count'}>{props.unReaded}</div> :
                        <MessageStatusIcon isMe={props.isMe} isReaded={false}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default DialogItem;