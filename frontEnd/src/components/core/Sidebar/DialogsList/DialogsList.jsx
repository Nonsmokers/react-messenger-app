import React from 'react';
import './DialogsList.scss';
import DialogItem from '../DialogItem/DialogItem';
import {Empty} from "antd";

const DialogsList = ({items,userId,currentDialogId ,onSelectDialog}) => {

    let copyOfArr = [...items]
    copyOfArr.sort((a, b) => a.sendingTime > b.sendingTime ? 1 : -1)

    return (
        <>
            {items.length ? (
                    copyOfArr.map(item => (
                        <DialogItem
                            onSelectDialog={onSelectDialog}
                            key={item._id}
                            {...item}
                            unReaded={3}
                            isMe={item._id === userId}
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