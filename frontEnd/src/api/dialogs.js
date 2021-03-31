import axios from '../config/axios'

export default Object.assign({
    getAll: () => axios.get('/dialogs')
})