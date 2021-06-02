import {notification} from 'antd'
import {IconType} from 'antd/lib/notification'

type PropsType = {
    type: IconType
    title: string
    text: string
    duration?: number
}

const openNotification = ({type = 'info', title, text, duration = 3}: PropsType) => {
    notification.open({
        type: type,
        message: title,
        description: text,
        duration,
    })
}

export default openNotification