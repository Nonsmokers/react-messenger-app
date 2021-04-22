import React from 'react';
import {EllipsisOutlined} from '@ant-design/icons';
import {Button, Popover} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';

import './HomePage.scss';
import MessagesContainer from "../../core/Messages/MessagesContainer";
import StatusContainer from "../../common/Status/StatusContainer";
import SidebarContainer from "../../core/Sidebar/SidebarContainer";
import ChatInputContainer from "../../core/ChatInput/ChatInputContainer";

const HomePage = ({currentDialogId, logout}) => {
    const content =
        <>
            <div><Button onClick={logout}>Выйти с аккаунта</Button></div>
        </>

    return (
        <div className='home'>
            <div className="chat">
                <SidebarContainer/>
                <div className="chat__dialog">
                    <div className="chat__dialog-header">
                        <div/>
                        <>
                            {currentDialogId && <StatusContainer/>}
                            <div>
                                <Popover trigger="click" placement="rightTop" content={content}>
                                    <Button type={'link'} shape="circle" icon={<EllipsisOutlined/>}/>
                                </Popover>
                            </div>
                        </>
                    </div>
                    <div className="chat__dialog-messages">
                        <Scrollbars>
                            <MessagesContainer/>
                        </Scrollbars>
                    </div>
                    {currentDialogId &&
                    < div className="chat__dialog-input">
                        <ChatInputContainer/>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default HomePage;