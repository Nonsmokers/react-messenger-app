import axios from '../axios'

export default {
    getAllByDialogId: (id) => axios.get('/messages?dialog=' + id)
}