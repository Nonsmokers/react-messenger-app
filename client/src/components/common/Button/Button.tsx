import React from 'react'
import {Button} from 'antd'
import './Button.scss'

const BaseButton= (props: any) => {
    return (
        <Button {...props}
                className='button'
        />
    )
}

export default BaseButton