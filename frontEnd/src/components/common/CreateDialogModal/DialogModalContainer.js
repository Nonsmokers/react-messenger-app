import React, {useState} from 'react';
import usersApi from "../../../api/users";
import dialogsApi from "../../../api/dialogs";
import DialogModal from "./DialogModal";

const DialogModalContainer = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messageText, setMessageText] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSearch = value => {
        setIsLoading(true);
        usersApi
            .findUser(value)
            .then(({data}) => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const onAddDialog = () => {
        dialogsApi
            .create({
                partner: selectedUserId,
                text: messageText
            })
            .then(handleCancel)
            .catch(() => {
                setIsLoading(false);
            });
    };

    const handleChangeInput = value => {
        setInputValue(value);
    };

    const onChangeTextArea = e => {
        setMessageText(e.target.value);
    };

    const onSelectUser = userId => {
        setSelectedUserId(userId);
    };

    return (
        <DialogModal users={users} onSelectUser={onSelectUser} onChangeTextArea={onChangeTextArea}
                     handleChangeInput={handleChangeInput} onAddDialog={onAddDialog} onSearch={onSearch}
                     handleCancel={handleCancel} handleOk={handleOk} isModalVisible={isModalVisible}
                     inputValue={inputValue} showModal={showModal} isLoading={isLoading} messageText={messageText}/>
    );
};

export default DialogModalContainer
