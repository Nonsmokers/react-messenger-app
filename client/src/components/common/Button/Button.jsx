import React from 'react';
import {Button} from 'antd';
import './Button.scss';

const BaseButton = (props) => {
    return (
        <Button {...props}
                className='button'
        />
    );
}

export default BaseButton;