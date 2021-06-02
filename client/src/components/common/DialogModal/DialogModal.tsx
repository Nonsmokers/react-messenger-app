import React from 'react'
import {Button, Form, Modal, Select, Input, Tooltip} from 'antd'
import {FormOutlined} from "@ant-design/icons"
import {UserType} from '../../../types/types'

const {Option} = Select
const {TextArea} = Input

type PropsType = {
    users: Array<UserType>
    onSelectUser: (userId: string)=>void
    onChangeTextArea: (e:any)=>void
    handleChangeInput: (value: any)=>void
    onAddDialog: ()=> Promise<void>
    onSearch: (value: string)=> Promise<void>
    isModalVisible: boolean
    inputValue: string
    showModal: ()=>void
    isLoading: boolean
    handleCancel: ()=>void
    messageText: string
    selectedUserId: string
}

const DialogModal: React.FC<PropsType> = ({
                         messageText, users, onSelectUser, onChangeTextArea, selectedUserId,
                         handleChangeInput, onAddDialog, onSearch, handleCancel,
                         isModalVisible, inputValue, showModal, isLoading
                     }) => {

    const options = users.map(user => (
        <Option key={user._id} value={user._id}>{user.fullname}</Option>
    ))

    return (
        <>
            <Tooltip title="Создать Диалог">
                <Button onClick={showModal} type={'link'} shape="circle" icon={<FormOutlined/>}/>
            </Tooltip>
            <Modal title="Создать Диалог" visible={isModalVisible} onCancel={handleCancel}
                   footer={[
                       <Button key="back" onClick={handleCancel}> Закрыть </Button>,
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
                            // @ts-ignore
                            autosize={{minRows: 3, maxRows: 10}}
                            onChange={onChangeTextArea}
                            value={messageText}
                        />
                    </Form.Item>}
                </Form>
            </Modal>
        </>
    )
}

export default DialogModal
