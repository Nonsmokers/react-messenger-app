import React from "react";
import {Form, Input} from "antd";
import {MailOutlined, LockOutlined, UserOutlined, InfoCircleTwoTone} from '@ant-design/icons';
import {Link} from "react-router-dom";
import WrapperBlock from "../../components/WrapperBlock/WrapperBlock";
import Button from "../../components/Button/Button";

const SignUpForm = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const Success = false;

    return (
        <>
            <div className='auth__title'>
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <WrapperBlock>
                {!Success ? (
                    <Form
                        name='normal_login'
                        className='login-form'
                        //initialValues={{remember: true}}
                        onFinish={onFinish}
                        size={"large"}
                    >
                        <Form.Item
                            name='mail'
                            className='auth__wrapper-input'
                            rules={[{required: true, message: 'Please input your Username!'}]}
                            hasFeedback //validateStatus='success'
                        >
                            <Input className='auth__login-input'
                                   prefix={<MailOutlined className='site-form-item-icon'/>}
                                   placeholder='E-mail'
                            />
                        </Form.Item>
                        <Form.Item
                            name='username'
                            className='auth__wrapper-input'
                            rules={[{required: true, message: 'Please input your Username!'}]}
                            hasFeedback //validateStatus='success'
                        >
                            <Input className='auth__login-input'
                                   prefix={<UserOutlined className='site-form-item-icon'/>}
                                   placeholder='Ваше имя'
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
                                placeholder="Пароль"
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
                                placeholder="Повторить Пароль"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" size="large">Зарегистрироваться</Button>
                        </Form.Item>
                        <Link className='auth__register-link' to='/sign-in'>Войти в аккаунт</Link>
                    </Form>
                ) : (<div className='auth__success-block'>
                    <div>
                        <InfoCircleTwoTone/>
                    </div>
                    <h3>Подтвердите свой аккаунт</h3>
                    <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                </div>)}
            </WrapperBlock>
        </>
    )
}

export default SignUpForm;