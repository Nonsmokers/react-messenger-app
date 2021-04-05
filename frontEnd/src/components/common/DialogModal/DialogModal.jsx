import React from 'react';
import {Button, Form, Modal, Select, Input} from 'antd';
import {FormOutlined} from "@ant-design/icons";

const {Option} = Select;
const {TextArea} = Input;

const DialogModal = ({
                         messageText, users, onSelectUser, onChangeTextArea,selectedUserId,
                         handleChangeInput, onAddDialog, onSearch,
                         isModalVisible, inputValue, showModal, isLoading
                     }) => {

    const options = users.map(user => (
        <Option key={user._id}>{user.fullname}</Option>
    ));

    return (
        <>
            <Button onClick={showModal} type={'link'} shape="circle" icon={<FormOutlined/>}/>
            <Modal title="Создать Диалог" visible={isModalVisible}
                   footer={[
                       <Button key="back"> Закрыть </Button>,
                       <Button
                           disabled={!messageText}
                           key="submit"
                           type="primary"
                           loading={isLoading}
                           onClick={onAddDialog}
                       > Создать </Button>
                   ]}>
                <Form className="add-dialog-form">
                    <Form.Item label="Введите имя пользователя или E-Mail">
                        <Select
                            value={inputValue}
                            onSearch={onSearch}
                            onChange={handleChangeInput}
                            onSelect={onSelectUser}
                            notFoundContent={null}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            placeholder="Введите имя пользователя или почту"
                            showSearch
                        >
                            {options}
                        </Select>
                    </Form.Item>
                    {selectedUserId && <Form.Item label="Введите текст сообщения">
                        <TextArea
                            autosize={{minRows: 3, maxRows: 10}}
                            onChange={onChangeTextArea}
                            value={messageText}
                        />
                    </Form.Item>}
                </Form>
            </Modal>
        </>
    );
};

export default DialogModal
