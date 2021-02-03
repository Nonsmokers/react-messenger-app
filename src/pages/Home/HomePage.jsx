import React from 'react';
import './HomePage.scss'
import Message from "../../components/Message/Message";

const HomePage = () => {
    return (
        <div className='home'>
            <Message avatar={'https://www.womanhit.ru/media/CACHE/images/articleimage2/2019/5/mountains-3959204960720-1/18848e6b932508789a3d23d92302fb01.jpg'}
                     text={'Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝'}
                     date={'Wed Feb 03 2021 13:21:25'}/>
        </div>
    );
}

export default HomePage;