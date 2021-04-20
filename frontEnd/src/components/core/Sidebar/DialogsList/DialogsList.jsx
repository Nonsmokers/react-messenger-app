import React from 'react';
import './DialogsList.scss';
import DialogItem from '../DialogItem/DialogItem';
import {Empty} from "antd";

const DialogsList = ({currentDialogId, onSelectDialog, currentUserId, filtered}) => {

    let copyOfArr = [...filtered]
    copyOfArr.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1)
    console.log(filtered)

    return (
        <>
            {filtered.length ? (
                    copyOfArr.map(item => (
                        <DialogItem
                            item={item}
                            key={item._id}
                            onSelectDialog={onSelectDialog}
                            unReaded={3}
                            isMe={item.last_message.sender._id === currentUserId}
                            currentDialogId={currentDialogId}
                        />)
                    )
                )
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено"/>
            }
        </>
    );
}

export default DialogsList;