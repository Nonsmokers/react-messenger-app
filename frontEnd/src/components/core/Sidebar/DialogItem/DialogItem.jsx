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
    console.log(item.last_message)
    return (
        <div className={classnames('dialogs__item', {
            'dialogs__item--online': item.partner.isOnline,
            'dialogs__item--selected': currentDialogId === item._id
        })}
             onClick={onSelectDialog.bind(this, item._id)}
        >
            <div className={'dialogs__item-avatar'}>
                <Avatar user={item.partner}/>
            </div>
            <div className='dialogs__item--info'>
                <div className='dialogs__item--info-title'>
                    <b>{item.partner.fullname}</b>
                    <span>
                        {getMessage(new Date(item.updatedAt))}
                    </span>
                </div>
                <div className='dialogs__item--info-bottom'>
                    {item.last_message.text && item.last_message.text.length ?
                        <p>{item.last_message.text}</p>
                        : <p>{item.last_message.attachments}</p>}
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