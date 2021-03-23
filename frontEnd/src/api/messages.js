import axios from '../utils/axios'

export default {
    getAllByDialogId: (id) => axios.get('/messages?dialog=' + id)
}