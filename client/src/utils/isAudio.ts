import {AttachmentType} from '../types/types'

export default (attachments: Array<AttachmentType>) => {
    if (!attachments) {
        return null
    }
    const file = attachments[0]
    return attachments.length && file.ext === "webm"
}