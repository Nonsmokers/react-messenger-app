import React from 'react';
import './DialogsList.scss';
import DialogItem from '../DialogItem/DialogItem';
import {Empty} from "antd";

const DialogsList = ({items, currentDialogId, onSelectDialog, currentUserId}) => {

    let copyOfArr = [...items]
    copyOfArr.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1)

    return (
        <>
            {items.length ? (
                    copyOfArr.map(item => (
                        <DialogItem
                            item={item}
                            key={item._id}
                            onSelectDialog={onSelectDialog}
                            unReaded={3}
                            isMe={item._id === currentUserId}
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