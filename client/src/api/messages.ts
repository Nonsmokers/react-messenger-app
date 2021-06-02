import axios from '../config/axios'
import {AttachmentType, MessageType} from '../types/types'

export default Object.assign({
    getAllByMessages: (id: string) => axios.get<MessageType>('/messages?dialog=' + id)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err.response
        }),
    send: (text: string, currentDialogId: string, attachments: Array<AttachmentType>) => axios.post<MessageType>('/messages', {
        text, currentDialogId, attachments
    })
        .then((res) => {
            return res.data
        }).catch((err) => {
            return err.response
        })
})