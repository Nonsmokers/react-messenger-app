import React from 'react'
import './DialogsList.scss'
import DialogItem from '../DialogItem/DialogItem'
import {Empty} from "antd"
import {DialogType, UserType} from '../../../../types/types'

type PropsType = {
    filtered: Array<DialogType>
    currentDialogId: null | string
    isReady: boolean
    currentUserData: UserType | null
    currentUserId: string
    onSelectDialog: (dialogId: string) => void
}


const DialogsList: React.FC<PropsType> = ({
                                                        currentDialogId,
                                                        onSelectDialog,
                                                        currentUserId,
                                                        filtered,
                                                        currentUserData,
                                                        isReady
                                                    }) => {

    let copyOfArr = [...filtered]
    copyOfArr.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1)

    return (
        <>
            {filtered.length ? (
                    copyOfArr.map(item => (
                        <DialogItem
                            item={item}
                            key={item._id}
                            onSelectDialog={onSelectDialog}
                            unReaded={3}
                            isReady={isReady}
                            isMe={item.last_message.sender._id === currentUserId}
                            currentDialogId={currentDialogId}
                            currentUserData={currentUserData}
                        />)
                    )
                )
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено"/>
            }
        </>
    )
}

export default DialogsList