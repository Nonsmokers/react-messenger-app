import {InferActionsTypes} from '../rootReducer'
import {AttachmentType} from '../../types/types'

export type AttachmentsActionsType = InferActionsTypes<typeof ATTACHMENTS_ACTIONS>

export const ATTACHMENTS_ACTIONS = {
    setAttachments: (data: Array<AttachmentType>) => ({type: 'SET_ATTACHMENTS', payload: data} as const),
    removeAttachment: (file: any) => ({type: 'REMOVE_ITEM', payload: file} as const)
}
