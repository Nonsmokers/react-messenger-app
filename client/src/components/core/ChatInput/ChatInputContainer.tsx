import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import filesApi from '../../../api/files'
import {ChatInput} from "./ChatInput"
import {MESSAGES_THUNKS} from "../../../redux/actions/messages"
import {ATTACHMENTS_ACTIONS} from "../../../redux/actions/attachments"
import {AttachmentType} from '../../../types/types'
import {RootStateType} from '../../../redux/rootReducer'

export type SendMessageType = {
    text: string | null,
    dialogId: string | null,
    attachments: Array<AttachmentType>
}

export const ChatInputContainer = () => {

    const attachments = useSelector(selectAttachments)
    const currentDialogId = useSelector(selectCurrentDialogId)

    const dispatch = useDispatch()

    const onSendMessage = (data: SendMessageType) =>
        dispatch(MESSAGES_THUNKS.fetchSendMessage(data))
    const removeAttachment = (file: any) => dispatch(ATTACHMENTS_ACTIONS.removeAttachment(file))
    const setAttachments = (data: Array<any>) => dispatch(ATTACHMENTS_ACTIONS.setAttachments(data))

    window.navigator.getUserMedia =
        // @ts-ignore
        window.navigator.getUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia || window.navigator.webkitGetUserMedia

    const [value, setValue] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const [mediaRecorder, setMediaRecorder] : any= useState(null)
    const [isLoading, setLoading] = useState(false)

    const onRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true}, onRecording, onError)
        }
    }

    const onRecording = (stream: any) => {

        // @ts-ignore
        const recorder = new MediaRecorder(stream)
        setMediaRecorder(recorder)
        recorder.start()

        recorder.onstart = () => {
            setIsRecording(true)
        }

        recorder.onstop = () => {
            setIsRecording(false)
        }

        recorder.ondataavailable = async (e: any) => {
            const file = new File([e.data], 'audio.webm')

            setLoading(true)
            const response = await filesApi.upload(file)
            await sendAudio(response.file._id)
            try {
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const onHideRecording = () => {
        setIsRecording(false)
    }

    const onError = (err: any) => {
        console.log('The following error occured: ' + err)
    }

    const emojiSelected = (e: any) => {
        setValue(value + e)
    }

    const sendAudio = (audioId: any) => {
        return onSendMessage( {
            text: null,
            dialogId: currentDialogId,
            attachments: [audioId]
        })
    }

    const sendMessage = () => {
        if (isRecording) {
            mediaRecorder.stop()
        }

        const trimValue = value.trim()
        if (trimValue.length || attachments.length) {
            onSendMessage({
                text: trimValue,
                dialogId: currentDialogId,
                attachments: attachments.map((file: any) => file.uid)
            })
            setValue('')
            setAttachments([])
        }
    }

    const handleSendMessage = (e: any) => {
        if (e.keyCode === 13) {
            sendMessage()
        }
    }

    const onSelectFiles = async (files: any) => {
        let uploaded: Array<any> = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const uid = Math.round(Math.random() * 1000)
            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: 'uploading',
                },
            ]
            setAttachments(uploaded)

            await filesApi.upload(file).then((data: any) => {
                uploaded = uploaded.map((item) => {
                    if (item.uid === uid) {
                        return {
                            status: 'done',
                            uid: data.file._id,
                            name: data.file.filename,
                            url: data.file.url
                        }
                    }
                    return item
                })
            })
        }
        setAttachments(uploaded)
    }

    return (
        <ChatInput
            value={value}
            setValue={setValue}
            handleSendMessage={handleSendMessage}
            sendMessage={sendMessage}
            emojiSelected={emojiSelected}
            attachments={attachments}
            removeAttachment={removeAttachment}
            onSelectFiles={onSelectFiles}
            isLoading={isLoading}
            onRecord={onRecord}
            onHideRecording={onHideRecording}
            isRecording={isRecording}
        />
    )
}

const selectCurrentDialogId = (state: RootStateType) => state.dialogsReducer.currentDialogId
const selectAttachments = (state: RootStateType) => state.attachmentsReducer.items