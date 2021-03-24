import React from 'react';
import {Result} from 'antd';
import Block from '../../common/AuthWrapperBlock/AuthWrapperBlock';


const CheckEmailInfo = () => {

    return (
        <div className="verify-block">
            <Block>
                <Result
                    status={'success'}
                    title={'Привет, УРА ! '}
                    subTitle={'qweqweqwe'}
                />
            </Block>
        </div>
    );
};

export default CheckEmailInfo;