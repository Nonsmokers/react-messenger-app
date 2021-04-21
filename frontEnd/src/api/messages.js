import axios from '../config/axios'

export default Object.assign({
    getAllByDialogId: (id) => axios.get('/messages?dialog=' + id).catch((err) => {
        return err.response
    }),
    send: (text, currentDialogId, attachments) => axios.post('/messages', {
        text,
        currentDialogId,
        attachments
    }).catch((err) => {
        return err.response
    })
})