import React from 'react';
import {EllipsisOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';

import './HomePage.scss';
import Status from "../../../components/common/Status/Status";
import ChatInput from "../../mains/ChatInputBlock/ChatInput";
import SidebarContainer from "../../mains/Sidebar/SidebarContainer";
import MessagesContainer from "../../mains/Messages/MessagesContainer";

const HomePage = (props) => {
    return (
        <div className='home'>
            <div className="chat">
                <SidebarContainer/>
                <div className="chat__dialog">
                    <div className="chat__dialog-header">
                        <div/>
                        <div className="chat__dialog-header-center">
                            <b className="chat__dialog-header-username"> Гай Юлий Цезарь </b>
                            <div className="chat__dialog-header-status">
                                <Status online={true}/>
                            </div>
                        </div>
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
                        <ChatInput/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;