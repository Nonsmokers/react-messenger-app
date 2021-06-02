import React, {useState} from 'react'
import usersApi from "../../../api/users"
import dialogsApi from "../../../api/dialogs"
import DialogModal from "./DialogModal"
import openNotification from "../../../utils/openNotification"
import {UserType} from '../../../types/types'

type PropsType = {
    currentUserData: null | UserType
}

const DialogModalContainer: React.FC<PropsType> = ({currentUserData}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [messageText, setMessageText] = useState("")
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState('')

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const onSearch = async (value: string) => {
        setIsLoading(true)
        const response = await usersApi.findUsers(value)
        try {
            setUsers(response.data)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const onAddDialog = async () => {
        const dialog = await dialogsApi.create({
            // @ts-ignore
            author: currentUserData._id,
            partner: selectedUserId,
            text: messageText
        })

        if (dialog && dialog.status === 403) {
            openNotification({
                type: 'error',
                title: 'Ошибка',
                text: 'Такой диалог уже существует.'
            })
        }

        try {
            handleCancel()
        } catch (e) {
            setIsLoading(false)
        }
    }

    const handleChangeInput = (value: string) => {
        setInputValue(value)
    }

    const onChangeTextArea = (e: any) => {
        setMessageText(e.target.value)
    }

    const onSelectUser = (userId: string) => {
        setSelectedUserId(userId)
    }

    return (
        <DialogModal users={users}
                     onSelectUser={onSelectUser}
                     onChangeTextArea={onChangeTextArea}
                     handleChangeInput={handleChangeInput}
                     onAddDialog={onAddDialog}
                     onSearch={onSearch}
                     isModalVisible={isModalVisible}
                     inputValue={inputValue}
                     showModal={showModal}
                     isLoading={isLoading}
                     handleCancel={handleCancel}
                     messageText={messageText}
                     selectedUserId={selectedUserId}
        />
    )
}

export default DialogModalContainer
