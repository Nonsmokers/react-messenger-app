import React from 'react';
import {Button, Input} from 'antd';
import {FormOutlined, SearchOutlined, TeamOutlined} from "@ant-design/icons";
import {Scrollbars} from "react-custom-scrollbars";

import './Sidebar.scss';
import DialogsList from "../DialogsList/DialogsList";

const Sidebar = (props) => {

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
                           value={props.search}
                           onChange={event => props.setSearch(event.target.value)}
                           prefix={<SearchOutlined/>}
                    />
                </div>
            </div>
            <div className="chat__sidebar-dialogs">
                <Scrollbars>
                    <DialogsList userId={0} items={props.filtered}/>
                </Scrollbars>
            </div>
        </div>
    );
}

export default Sidebar;