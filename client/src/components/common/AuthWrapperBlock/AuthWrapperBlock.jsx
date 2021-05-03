import React from 'react';
import './AuthWrapperBlock.scss';

const AuthWrapperBlock = ({children}) => {
    return (
        <div className='block'>
            {children}
        </div>
    );
}

export default AuthWrapperBlock;