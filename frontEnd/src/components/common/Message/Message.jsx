import React from 'react';
import className from 'classnames'
import './Message.scss';
import MessageStatusIcon from "../MessageStatusIcon/MessageStatusIcon";
import SendingTime from "../SendingTime/SendingTime";
import MessageAudio from "../MessageAudio/MessageAudio";
import Avatar from "../Avatar/Avatar";

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
                    <Avatar user={props.user}/>
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