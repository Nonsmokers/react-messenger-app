import axios from '../config/axios'

export default Object.assign({
    getAll: () => axios.get('/dialogs'),
    create: ({ partner, text }) => axios.post("/dialogs", { partner, text })
})