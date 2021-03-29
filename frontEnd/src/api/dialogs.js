import axios from '../utils/axios'

export default {
    getAll: () => axios.get('/dialogs')
}