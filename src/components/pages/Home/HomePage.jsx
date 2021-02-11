import React from 'react';
import {EllipsisOutlined} from '@ant-design/icons'
import {Button} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';

import './HomePage.scss'
import Message from "../../../components/common/Message/Message";
import audio from "../../../assets/audio_test.mp3";
import Status from "../../../components/common/Status/Status";
import ChatInput from "../../../components/common/ChatInput/ChatInput";
import Sidebar from "../../../components/common/Sidebar/Sidebar";

const HomePage = (props) => {
    return (
        <div className='home'>
            <div className="chat">
                <Sidebar/>
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
                            <Message
                                avatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGpbFMYmTACEZ4AKPW-QSjMbvgyL_bOj5jw&usqp=CAU'}
                                sendingTime={new Date(2021, 1, 12)}
                                isMe={true}
                                audio={audio}
                                isReaded={false}
                            />
                            <Message
                                avatar={'https://www.womanhit.ru/media/CACHE/images/articleimage2/2019/5/mountains-3959204960720-1/18848e6b932508789a3d23d92302fb01.jpg'}
                                text={'Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝'}
                                sendingTime={new Date(2021, 1, 12)}
                                isMe={true}
                                isReaded={true}
                                attachments={[
                                    {
                                        filename: "image.jpg",
                                        url: "https://source.unsplash.com/100x100/?random=1&nature,water"
                                    },
                                    {
                                        filename: "image.jpg",
                                        url: "https://source.unsplash.com/100x100/?random=2&nature,water"
                                    },
                                    {
                                        filename: "image.jpg",
                                        url: "https://source.unsplash.com/100x100/?random=3&nature,water"
                                    }
                                ]}
                            />
                            <Message
                                avatar={'https://www.womanhit.ru/media/CACHE/images/articleimage2/2019/5/mountains-3959204960720-1/18848e6b932508789a3d23d92302fb01.jpg'}
                                sendingTime={new Date(2021, 1, 12)}
                                isMe={false}
                                isReaded={true}
                                attachments={[
                                    {
                                        filename: "image.jpg",
                                        url: "https://source.unsplash.com/100x100/?random=1&nature,water"
                                    }
                                ]}
                            />
                            <Message
                                avatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGpbFMYmTACEZ4AKPW-QSjMbvgyL_bOj5jw&usqp=CAU'}
                                text={'Здоровенько 🌝'}
                                sendingTime={new Date(2021, 1, 12)}
                                isMe={false}
                                isReaded={true}
                            />
                            <Message
                                avatar={'https://www.womanhit.ru/media/CACHE/images/articleimage2/2019/5/mountains-3959204960720-1/18848e6b932508789a3d23d92302fb01.jpg'}
                                isTyping={true}
                            />
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