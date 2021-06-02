export type UserType = {
    id: string
    avatar: string
    confirmed: boolean
    last_visit: string
    email: string
    fullname: string
    password: string
    confirm_hash: string
    isOnline: boolean
    createdAt: string
    updatedAt: string
    _id: string
}
export type MessageType = {
    unread: boolean
    attachments: Array<AttachmentType>
    dialog: DialogType
    sender: UserType
    text: string
    createdAt: string
    updatedAt: string
    _id: string
}
export type DialogType = {
    author: UserType
    partner: UserType
    last_message: MessageType
    createdAt: string
    updatedAt: string
    _id: string
}
export type AttachmentType = {
    status: string
    uid: string
    name: string
    url: string
    ext: string
    filename: string
    size: number
    createdAt: string
    updatedAt: string
    user: string
    _id: string
}
export type SignInPostDataType = {
    email: string
    isLogin: boolean
    password: string
}
export type SignUpPostDataType = {
    email: string
    fullname: string
    password: string
    password2: string
}