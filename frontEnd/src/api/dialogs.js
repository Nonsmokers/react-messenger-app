import axios from '../utils/axios'

export default Object.assign({
    getAll: () => axios.get('/dialogs')
})