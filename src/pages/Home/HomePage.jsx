import React from 'react';
import './HomePage.scss'
import {EllipsisOutlined, FormOutlined, SearchOutlined, TeamOutlined} from '@ant-design/icons'
import {Input} from 'antd';
import Dialogs from "../../components/Dialogs/Dialogs";
import Message from "../../components/Message/Message";
import audio from "../../assets/audio_test.mp3";
import Status from "../../components/Status/Status";
import ChatInput from "../../components/ChatInput/ChatInput";


const HomePage = (props) => {
    return (
        <div className='home'>
            <div className="chat">
                <div className="chat__sidebar">
                    <div className="chat__sidebar-header">
                        <TeamOutlined/>
                        <div>
                            <span>Список диалогов</span>
                        </div>
                        <FormOutlined/>
                    </div>
                    <div className="chat__sidebar-search">
                        <div className="chat__sidebar-search-input">
                            <Input allowClear
                                   placeholder="Поиск по диалогам"
                                   prefix={<SearchOutlined/>}
                            />
                        </div>
                    </div>
                    <div className="chat__sidebar-dialogs">
                        <Dialogs userId={0}
                                 items={[
                                     {
                                         _id: 0, //Math.floor(Math.random() * 100)
                                         text: 'Minus modi natus nostrum officia, provident quibusdam rerum tempore ullam?',
                                         isReaded: false,
                                         sendingTime: new Date(2021, 1, 12),
                                         user: {
                                             _id: 1,
                                             fullName: 'Ali German',
                                             avatar: 'https://www.womanhit.ru/media/CACHE/images/articleimage2/2019/5/mountains-3959204960720-1/18848e6b932508789a3d23d92302fb01.jpg',
                                             isOnline: true
                                         }
                                     },
                                     {
                                         _id: 1,  //Math.floor(Math.random() * 100)
                                         text: 'Officia, provident quibusdam rerum tempore ullam?',
                                         isReaded: false,
                                         sendingTime: new Date(2021, 2, 5),
                                         user: {
                                             _id: 1,
                                             fullName: 'Ivonka Tramp',
                                             avatar: 'https://lh3.googleusercontent.com/proxy/Q8JIhAQ1yP8pcABYasv-5vLYNOOFzJVAiiTVGVDwyO4yYK-JgFDcwDBCzyk-8ZNuMBe3NgicKUZCKhYBxl6qjV1IHtYm7-yJ7eiIKfO6qEzj8UXoVz6jk5s',
                                             isOnline: true
                                         }
                                     }
                                 ]}
                        />
                    </div>
                </div>
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
                            <EllipsisOutlined/>
                        </div>
                    </div>
                    <div className="chat__dialog-messages">
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
                    </div>
                    <div className="chat__dialog-input">
                        <ChatInput />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;