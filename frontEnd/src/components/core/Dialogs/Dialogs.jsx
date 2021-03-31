import React from 'react';
import {Button, Input} from 'antd';
import {FormOutlined, SearchOutlined, TeamOutlined} from "@ant-design/icons";
import {Scrollbars} from "react-custom-scrollbars";

import './Dialogs.scss';
import DialogsList from "./DialogsList/DialogsList";

const Dialogs = ({items, filtered, currentDialogId, currentUserId, onSelectDialog, search, setSearch}) => {
    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <Button type={'link'} shape="circle" icon={<TeamOutlined/>}/>
                <div>
                    <span>Список диалогов</span>
                </div>
                <Button type={'link'} shape="circle" icon={<FormOutlined/>}/>
            </div>
            <div className="chat__sidebar-search">
                <div className="chat__sidebar-search-input">
                    <Input allowClear
                           placeholder="Поиск по диалогам"
                           value={search}
                           onChange={event => setSearch(event.target.value)}
                           prefix={<SearchOutlined/>}
                    />
                </div>
            </div>
            <div className="chat__sidebar-dialogs">
                <Scrollbars>
                    <DialogsList items={items}
                                 filtered={filtered}
                                 onSelectDialog={onSelectDialog}
                                 currentDialogId={currentDialogId}
                                 currentUserId={currentUserId}
                    />
                </Scrollbars>
            </div>
        </div>
    );
}

export default Dialogs;