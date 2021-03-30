import axios from '../utils/axios'

export default Object.assign({
    getAllByDialogId: (id) => axios.get('/messages?dialog=' + id)
})