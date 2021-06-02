import axios from '../config/axios'
import {DialogType} from '../types/types'

export default Object.assign({
    getAll: () => axios.get<DialogType>('/dialogs').catch((err) => {
        return err.response
    }),
    create: ({partner, text}: any) => axios.post<DialogType>("/dialogs", {partner, text}).catch((err) => {
        return err.response
    })
})