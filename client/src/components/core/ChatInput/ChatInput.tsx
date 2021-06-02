import React from "react"
// @ts-ignore
import {UploadField} from "@navjobs/upload"
import {CameraOutlined, AudioOutlined, SendOutlined, LoadingOutlined, AudioMutedOutlined} from '@ant-design/icons'
import {Button, Input, Tooltip} from 'antd'

import "./ChatInput.scss"
import EmojiInput from "../../common/Emoji/Emoji"
import UploadFile from "../../common/UploadFile/UploadFile"
import {AttachmentType} from '../../../types/types'

type PropsType = {
    handleSendMessage: (e: any) => void
    onSelectFiles: (files: any) => void
    sendMessage: () => void
    value: string
    setValue: (e: string) => void
    emojiSelected: (e: any) => void
    attachments: Array<AttachmentType>
    removeAttachment: (file: any) => void
    isLoading: boolean
    onRecord: () => void
    onHideRecording: (e: any) => void
    isRecording: boolean
}

export const ChatInput: React.FC<PropsType> = ({
                                                   handleSendMessage,
                                                   onSelectFiles,
                                                   sendMessage,
                                                   value,
                                                   setValue,
                                                   emojiSelected,
                                                   attachments = [],
                                                   removeAttachment,
                                                   isLoading,
                                                   onRecord,
                                                   onHideRecording,
                                                   isRecording
                                               }) => {

    const {TextArea} = Input

    return (
        <>
            <div className="chat-input">
                <div className="chat-input__smile-btn">
                    <EmojiInput emojiSelected={emojiSelected}/>
                </div>
                <TextArea
                    value={value}
                    disabled={!!isRecording}
                    autoSize={{maxRows: 3}}
                    onChange={e => setValue(e.target.value)}
                    onKeyUp={handleSendMessage}
                    placeholder={isRecording ? "   Голосовое сообщение..." : "Введите текст сообщения…"}
                />
                <div className="chat-input__actions">
                    {isRecording ? (
                        <>
                            <Tooltip title="Стоп">
                                <div className="chat-input__actions-record--dot"/>
                                <Button onClick={onHideRecording} type={"link"} shape="circle"
                                        icon={<AudioMutedOutlined/>}/>
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip title="Загрузить">
                            <UploadField
                                className={'upload-btn'}
                                onFiles={onSelectFiles}
                                containerProps={{
                                    className: 'chat-input__actions--upload-btn'
                                }}
                                uploadProps={{
                                    accept: '.jpg,.gif,.jpeg, .bmp,.png',
                                    multiple: 'multiple'
                                }}
                            >
                                <Button type={'link'} shape="circle" icon={<CameraOutlined/>}/>
                            </UploadField>
                        </Tooltip>
                    )}
                    {isLoading ? (
                        <Button type="link" shape="circle" icon={<LoadingOutlined/>}/>
                    ) : isRecording || value || attachments.length ? (
                        <Tooltip title="Отправить">
                            <Button onClick={sendMessage} type={'link'} shape="circle" icon={<SendOutlined/>}/>
                        </Tooltip>
                    ) : (
                        <div className="chat-input__record-btn">
                            <Tooltip title="Запись">
                                <Button onClick={onRecord} type={"link"} shape="circle" icon={<AudioOutlined/>}/>
                            </Tooltip>
                        </div>
                    )}
                </div>

            </div>
            <div className="chat-input__attachments">
                {attachments.length > 0 && (
                    <UploadFile
                        removeAttachment={removeAttachment}
                        attachments={attachments}
                    />)}
            </div>
        </>
    )
}