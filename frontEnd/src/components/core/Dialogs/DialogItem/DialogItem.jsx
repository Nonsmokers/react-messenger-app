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

const DialogItem = ({item, onSelectDialog, isMe, currentDialogId, unReaded}) => {
    return (
        <div className={classnames('dialogs__item', {
            'dialogs__item--online': item.last_message.sender.isOnline,
            'dialogs__item--selected': currentDialogId === item._id

        })}
             onClick={onSelectDialog.bind(this, item._id)}
        >
            <div className={'dialogs__item-avatar'}>
                <Avatar user={item.last_message.sender}/>
            </div>
            <div className='dialogs__item--info'>
                <div className='dialogs__item--info-title'>
                    <b>{item.partner.fullname}</b>
                    <span>
                        {getMessage(new Date(item.updatedAt))}
                    </span>
                </div>
                <div className='dialogs__item--info-bottom'>
                    <p>{item.last_message.text}</p>
                    {unReaded > 0 ?
                        <div className={'dialogs__item--info-bottom-count'}>{unReaded}</div> :
                        <MessageStatusIcon isMe={isMe} isReaded={false}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default DialogItem;