import React from 'react';
import './DialogsList.scss';
import DialogItem from '../DialogItem/DialogItem';
import {Empty} from "antd";

const DialogsList = (props) => {

    let copyOfArr = [...props.items]
    copyOfArr.sort((a, b) => a.sendingTime > b.sendingTime ? 1 : -1)

    return (
        <>
            {props.items.length ? (
                    copyOfArr.map(item => (
                        <DialogItem
                            onSelectDialog={props.onSelectDialog}
                            key={item._id}
                            {...item}
                            unReaded={3}
                            isMe={item._id === props.userId}
                        />)
                    )
                )
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено"/>
            }
        </>
    );
}

export default DialogsList;