import axios from '../config/axios'

export default Object.assign({
    getAllByDialogId: (id) => axios.get('/messages?dialog=' + id)
})