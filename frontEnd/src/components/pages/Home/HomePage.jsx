import React from 'react';
import {EllipsisOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';

import './HomePage.scss';
import MessagesContainer from "../../core/Messages/MessagesContainer";
import StatusContainer from "../../common/Status/StatusContainer";
import SidebarContainer from "../../core/Sidebar/SidebarContainer";
import ChatInputContainer from "../../core/ChatInput/ChatInputContainer";

const HomePage = () => {
    return (
        <div className='home'>
            <div className="chat">
                <SidebarContainer/>
                <div className="chat__dialog">
                    <div className="chat__dialog-header">
                        <div/>
                        <StatusContainer/>
                        <div>
                            <Button type={'link'} shape="circle" icon={<EllipsisOutlined/>}/>
                        </div>
                    </div>
                    <div className="chat__dialog-messages">
                        <Scrollbars>
                            <MessagesContainer/>
                        </Scrollbars>
                    </div>
                    <div className="chat__dialog-input">
                        <ChatInputContainer/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;