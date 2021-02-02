import React from "react";
import {Form, Input} from "antd";
import Button from "../../components/Button/Button";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import WrapperBlock from "../../components/WrapperBlock/WrapperBlock";
import {Link} from "react-router-dom";

const SignInForm = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <>
            <div className='auth__title'>
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <WrapperBlock>

                <Form
                    name='normal_login'
                    className='login-form'
                    //initialValues={{remember: true}}
                    onFinish={onFinish}
                    size={"large"}
                >
                    <Form.Item
                        name='username'
                        className='auth__wrapper-input'
                        rules={[{required: true, message: 'Please input your Username!'}]}
                        hasFeedback //validateStatus='success'
                    >
                        <Input className='auth__login-input'
                               prefix={<UserOutlined className='site-form-item-icon'/>}
                               placeholder='Username'
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        className='auth__wrapper-input'
                        rules={[{required: true, message: 'Please input your Password!'}]}
                        hasFeedback //validateStatus='success'
                    >
                        <Input
                            className='auth__login-input'
                            prefix={<LockOutlined className='site-form-item-icon'/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large">Войти в аккаунт</Button>
                    </Form.Item>
                    <Link className='auth__register-link' to='/sign-up'>Зарегистрироваться</Link>
                </Form>
            </WrapperBlock>
        </>
    )
}

export default SignInForm;