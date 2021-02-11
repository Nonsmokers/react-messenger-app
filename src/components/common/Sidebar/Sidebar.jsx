import React, { useEffect, useState} from 'react';
import {Button, Input} from 'antd';
import {FormOutlined, SearchOutlined, TeamOutlined} from "@ant-design/icons";
import {Scrollbars} from "react-custom-scrollbars";

import './Sidebar.scss';
import DialogsList from "../DialogsList/DialogsList";
import dialogsJSON from "../../../dialogs.json";

const Sidebar = (props) => {

    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([...dialogsJSON]);

    const filterUsersByName = (arr, name) => {
        setFiltered(arr.filter(function (element) {
            return element.user.fullname.toLowerCase().includes(name.toLowerCase());
        }))
    }

    const debounce = (fn, ms) => {
        let timeout;
        return function () {
            const later = () => {
                fn.apply(this, arguments)
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, ms);
        };
    }

    const onSearch = debounce(() => {
            filterUsersByName(dialogsJSON, search)
        }, 1500)


    useEffect(() => {
        console.log(search)
        onSearch(search)
    }, [search]);

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
                    <DialogsList userId={0} items={filtered}/>
                </Scrollbars>
            </div>
        </div>
    );
}

export default Sidebar;