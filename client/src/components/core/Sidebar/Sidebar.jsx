import React from 'react';
import {Button, Input} from 'antd';
import { SearchOutlined, TeamOutlined} from "@ant-design/icons";
import {Scrollbars} from "react-custom-scrollbars";

import './Sidebar.scss';
import DialogsList from "./DialogsList/DialogsList";
import DialogModalContainer from "../../common/DialogModal/DialogModalContainer";

const Sidebar = ({filtered, currentDialogId, currentUserId, onSelectDialog, search, setSearch, currentUserData}) => {
    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <Button type={'link'} shape="circle" icon={<TeamOutlined/> }/>
                <div>
                    <span>Список диалогов</span>
                </div>
                <DialogModalContainer currentUserData={currentUserData}/>
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
                    <DialogsList filtered={filtered}
                                 onSelectDialog={onSelectDialog}
                                 currentDialogId={currentDialogId}
                                 currentUserId={currentUserId}
                    />
                </Scrollbars>
            </div>
        </div>
    );
}

export default Sidebar;