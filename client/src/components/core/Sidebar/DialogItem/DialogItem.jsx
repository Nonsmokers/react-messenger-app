import React, {useEffect, useState} from 'react';
import classnames from 'classnames';
import MessageStatusIcon from '../../../common/MessageStatusIcon/MessageStatusIcon';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import Avatar from "../../../common/Avatar/Avatar";

const getMessageTime = (sendingDate) => {
    if (isToday(sendingDate)) {
        return format(sendingDate, 'HH:mm');
    } else {
        return format(sendingDate, 'dd.MM.yy')
    }
}

const DialogItem = ({item, onSelectDialog, isMe, currentDialogId, unReaded, currentUserData, isReady}) => {

    const [partner, setPartner] = useState({});
    console.log(partner)
    useEffect(() => {
        if (isReady) {
            item.author.id === currentUserData._id ? setPartner(item.partner) : setPartner(item.author);
        }
    }, [currentUserData._id, item.author, item.partner, isReady])

    return (
        <div className={classnames('dialogs__item', {
            'dialogs__item--online': partner.isOnline,
            'dialogs__item--selected': currentDialogId === item._id
        })}
             onClick={onSelectDialog.bind(this, item._id)}
        >
            <div className={'dialogs__item-avatar'}>
                <Avatar user={item.partner}/>
            </div>
            <div className='dialogs__item--info'>
                <div className='dialogs__item--info-title'>
                    <b>{partner.fullname}</b>
                    <span>
                        {getMessageTime(new Date(item.updatedAt))}
                    </span>
                </div>
                <div className='dialogs__item--info-bottom'>
                    {item.last_message.text && item.last_message.text.length ?
                        <p>{isMe ? `Вы: ${item.last_message.text}` : item.last_message.text}</p>
                        : <p>{isMe ? `Вы: Прикрепленный файл` : 'Прикрепленный файл'}</p>}
                    {unReaded > 0 ?
                        <div className={'dialogs__item--info-bottom-count'}>{unReaded}</div> :
                        <>{!isMe && <MessageStatusIcon isMe={isMe} isReaded={false}/>}</>
                    }
                </div>
            </div>
        </div>
    );
}

export default DialogItem;