import React, {useState} from 'react';
import usersApi from "../../../api/users";
import dialogsApi from "../../../api/dialogs";
import DialogModal from "./DialogModal";

const DialogModalContainer = ({currentUserData}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messageText, setMessageText] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSearch = async (value) => {
        setIsLoading(true);
        const response = await usersApi.findUsers(value)
        try {
            setUsers(response.data);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    };

    const onAddDialog = async () => {
        await dialogsApi.create({
            author: currentUserData._id,
            partner: selectedUserId,
            text: messageText
        })
        try {
            handleCancel()
        } catch (e) {
            setIsLoading(false);
        }
    };

    const handleChangeInput = (value) => {
        setInputValue(value);
    };

    const onChangeTextArea = (e) => {
        setMessageText(e.target.value);
    };

    const onSelectUser = (userId) => {
        setSelectedUserId(userId);
    };

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
                     messageText={messageText}
                     selectedUserId={selectedUserId}
        />
    );
};

export default DialogModalContainer
