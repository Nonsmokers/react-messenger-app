import React from 'react';
import './DialogsList.scss';
import DialogItem from '../DialogItem/DialogItem';

const DialogsList = (props) => {

    let copyOfArr = [...props.items]
    copyOfArr.sort((a, b) => a.sendingTime > b.sendingTime ? 1 : -1)

    return (
        <>
            {copyOfArr.map(item => (
                <DialogItem
                    key={item._id}
                    {...item}
                    unReaded={3}
                    isMe={item._id === props.userId}
                />))
            }
        </>
    );
}

export default DialogsList;