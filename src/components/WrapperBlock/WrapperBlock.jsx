import React from 'react';
import './WrapperBlock.scss';

const WrapperBlock = ({children}) => {
    return (
        <div className='block'>
            {children}
        </div>
    );
}

export default WrapperBlock;