import React from 'react';
import './HomePage.scss'
import Dialogs from '../../components/Dialogs/Dialogs';

const HomePage = () => {
    return (
        <div className='home'>
            <Dialogs userId={0}
                     items={[
                         {
                             _id: 0/*Math.floor(Math.random() * 100)*/,
                             text: 'Minus modi natus nostrum officia, provident quibusdam rerum tempore ullam?',
                             isReaded: false,
                             sendingTime: new Date(2021,1,12),
                             user: {
                                 _id: 1,
                                 fullName: 'Ali German',
                                 avatar: 'https://www.womanhit.ru/media/CACHE/images/articleimage2/2019/5/mountains-3959204960720-1/18848e6b932508789a3d23d92302fb01.jpg',
                                 isOnline: true
                             }
                         },
                         {
                             _id: 1/*Math.floor(Math.random() * 100)*/,
                             text: 'Officia, provident quibusdam rerum tempore ullam?',
                             isReaded: false,
                             sendingTime: new Date(2021,2,5),
                             user: {
                                 _id: 1,
                                 fullName: 'Ivonka Tramp',
                                 avatar: 'https://lh3.googleusercontent.com/proxy/Q8JIhAQ1yP8pcABYasv-5vLYNOOFzJVAiiTVGVDwyO4yYK-JgFDcwDBCzyk-8ZNuMBe3NgicKUZCKhYBxl6qjV1IHtYm7-yJ7eiIKfO6qEzj8UXoVz6jk5s',
                                 isOnline: true
                             }
                         }
                     ]}/>

            {/*            <Message
                avatar={'https://www.womanhit.ru/media/CACHE/images/articleimage2/2019/5/mountains-3959204960720-1/18848e6b932508789a3d23d92302fb01.jpg'}
                text={'Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝'}
                date={'Wed Feb 03 2021 13:21:25'}
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
                avatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGpbFMYmTACEZ4AKPW-QSjMbvgyL_bOj5jw&usqp=CAU'}
                text={'Здоровеьнко 🌝'}
                date={'Wed Feb 03 2021 13:21:25'}
                isMe={true}
                isReaded={true}
            />
            <Message
                avatar={'https://www.womanhit.ru/media/CACHE/images/articleimage2/2019/5/mountains-3959204960720-1/18848e6b932508789a3d23d92302fb01.jpg'}
                date={'Wed Feb 03 2021 13:21:25'}
                isMe={false}
                isReaded={false}
                attachments={[
                    {
                        filename: "image.jpg",
                        url: "https://source.unsplash.com/100x100/?random=1&nature,water"
                    }
                ]}
            />
            <Message
                avatar={'https://www.womanhit.ru/media/CACHE/images/articleimage2/2019/5/mountains-3959204960720-1/18848e6b932508789a3d23d92302fb01.jpg'}
                isTyping={true}
                // посмотреть что прокидывать
            />
                        */}
        </div>
    );
}

export default HomePage;