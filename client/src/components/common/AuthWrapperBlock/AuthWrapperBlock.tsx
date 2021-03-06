import React from 'react'
import './AuthWrapperBlock.scss'

type PropsType = {
    children: any
}

const AuthWrapperBlock: React.FC<PropsType> = ({children}) => {
    return (
        <div className='block'>
            {children}
        </div>
    )
}

export default AuthWrapperBlock