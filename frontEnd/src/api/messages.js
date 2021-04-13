import axios from '../config/axios'

export default Object.assign({
    getAllByDialogId: (id) => axios.get('/messages?dialog=' + id),
    send: (text, currentDialogId, attachments) => axios.post('/messages', {
        text,
        currentDialogId,
        attachments
    })
})