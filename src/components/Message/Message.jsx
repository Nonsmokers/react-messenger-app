import React, {useEffect, useRef, useState} from 'react';
import className from 'classnames'

import './Message.scss';
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";
import SendingTime from "../SendingTime/SendingTime";
import waveSvg from "../../assets/img/Wave.svg";
import pauseSvg from "../../assets/img/pause.svg";
import playSvg from "../../assets/img/play.svg";

const convertCurrentTime = (number) => {
    const mins = Math.floor(number / 60);
    const secs = (number % 60).toFixed();
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
};


const MessageAudio = (props) => {

    const audioElem = useRef('')
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlay = () => {
        if (!isPlaying) {
            audioElem.current.play()
        } else {
            audioElem.current.pause()
        }
    };

    useEffect(() => {
        audioElem.current.addEventListener("playing", () => {
            setIsPlaying(true)
        });
        audioElem.current.addEventListener("pause", () => {
            setIsPlaying(false);
        });
        audioElem.current.addEventListener("ended", () => {
                setIsPlaying(false);
                setProgress(0);
                setCurrentTime(0);
            }
        );
        audioElem.current.addEventListener("timeupdate", () => {
            const duration = (audioElem.current && audioElem.current.duration) || 0;
            setCurrentTime(audioElem.current.currentTime);
            setProgress((audioElem.current.currentTime / duration) * 100);
        });
    }, [])


    return (
        <div className="message__audio">
            <audio ref={audioElem} src={props.audio} preload="auto"/>
            <div className="message__audio-progress"
                 style={{width: progress + '%'}}
            />
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={togglePlay}>
                        {isPlaying ? (
                            <img src={pauseSvg} alt="Pause svg"/>
                        ) : (
                            <img src={playSvg} alt="Play svg"/>
                        )}
                    </button>
                </div>
                <div className="message__audio-wave">
                    <img src={waveSvg} alt="Wave svg"/>
                </div>
                <span className="message__audio-duration">
                    {convertCurrentTime(currentTime)}
                </span>
            </div>
        </div>
    )
}

const Message = (props) => {

    return (
        <section className={className('message', {
            'message__isme': props.isMe,
            'message__istyping': props.isTyping,
            'message__isimage': props.attachments && props.attachments.length === 1,
            'message__isaudio': props.audio,

        })}>
            <div className={'message__content'}>
                <MessageStatusIcon isMe={props.isMe} isReaded={props.isReaded}/>
                <div className='message__avatar'>
                    <img src={props.avatar} alt='avatar'/>
                </div>
                <div className='message__info'>
                    {(props.audio || props.text || props.isTyping) && (
                        <div className='message__bubble'>
                            <p className='message__text'>{props.text}</p>
                            {props.isTyping && (
                                <div className='message__typing'>
                                    <span/>
                                    <span/>
                                    <span/>
                                </div>
                            )}
                            {props.audio && <MessageAudio audio={props.audio}/>}
                        </div>
                    )}
                    {props.attachments &&
                    <div className='message__attachments'>
                        {props.attachments.map((item, i) => (
                            <div key={i} className='message__attachments-item'>
                                <img src={item.url} alt={item.filename}/>
                            </div>
                        ))}
                    </div>}
                    {props.sendingTime &&
                    <span className='message__date'>
                        <SendingTime date={props.sendingTime ? props.sendingTime : null}/>
                    </span>}
                </div>
            </div>
        </section>
    );
}

export default Message;