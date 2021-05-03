import {SET_ATTACHMENTS, REMOVE_ITEM} from "./actionTypes";

const ATTACHMENTS_ACTIONS = {

    setAttachments: data => ({
        type: SET_ATTACHMENTS,
        payload: data
    }),

    removeAttachment: file => ({
        type: REMOVE_ITEM,
        payload: file
    })
}

export default ATTACHMENTS_ACTIONS;
