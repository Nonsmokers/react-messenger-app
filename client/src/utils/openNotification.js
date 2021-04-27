import {notification} from 'antd';

const openNotification = ({type = 'info', title, text, duration = 3}) => {
    notification.open({
        type: type,
        message: title,
        description: text,
        duration,
    });
};

export default openNotification;