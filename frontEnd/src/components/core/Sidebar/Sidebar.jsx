import React from 'react';
import {Button, Input} from 'antd';
import {FormOutlined, SearchOutlined, TeamOutlined} from "@ant-design/icons";
import {Scrollbars} from "react-custom-scrollbars";

import './Sidebar.scss';
import DialogsList from "./DialogsList/DialogsList";

const Sidebar = ({items, filtered, onSelectDialog, currentDialogId, setSearch, search}) => {

    console.log(items)

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
                    <DialogsList items={filtered} userId={0}
                                 onSelectDialog={onSelectDialog} currentDialogId={currentDialogId}/>
                </Scrollbars>
            </div>
        </div>
    );
}

export default Sidebar;