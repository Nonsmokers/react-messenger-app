import React from 'react';
import './Dialogs.scss';
import DialogItem from '../DialogItem/DialogItem';

const Dialogs = (props) => {

    let copyOfArr = [...props.items]
    copyOfArr.sort((a, b) => a.sendingTime > b.sendingTime ? 1 : -1)//Посмотреть может быть лучше использовать lodash

    return (
        <>
            {copyOfArr.map(item => (
                <DialogItem
                    key={item._id}
                    user={item.user}
                    message={item}
                    unReaded={3}
                    isMe={item._id === props.userId}
                />))}

        </>
    );
}

export default Dialogs;