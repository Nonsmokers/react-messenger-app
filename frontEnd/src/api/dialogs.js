import axios from '../config/axios'

export default Object.assign({
    getAll: () => axios.get('/dialogs').catch((err) => {
        return err.response
    }),
    create: ({partner, text}) => axios.post("/dialogs", {partner, text}).catch((err) => {
        return err.response
    })
})