import React from "react";
import {Form, Input} from "antd";
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Button from "../../components/Button/Button";
import WrapperBlock from "../../components/WrapperBlock/WrapperBlock";

const SignInForm = (props) => {

    const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;

    return (
        <>
            <div className='auth__title'>
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <WrapperBlock>
                <Form name='normal_login'
                      className='login-form'
                      onSubmit={handleSubmit}
                      size={"large"}>
                    <Form.Item className='auth__wrapper-input'
                               validateStatus={!touched.email ? '' : errors.email ? 'error' : 'success'}
                               help={!touched.email ? ' ' : errors.email}
                               hasFeedback
                    >
                        <Input id='email'
                               className='auth__login-input'
                               prefix={<MailOutlined className='site-form-item-icon'/>}
                               placeholder='E-mail'
                               value={values.email}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item className='auth__wrapper-input'
                               validateStatus={!touched.password ? '' : errors.password ? 'error' : 'success'}
                               help={!touched.password ? ' ' : errors.password}
                               hasFeedback
                    >
                        <Input id='password'
                               className='auth__login-input'
                               prefix={<LockOutlined className='site-form-item-icon'/>}
                               type="password"
                               placeholder="Пароль"
                               onChange={handleChange}
                               value={values.password}
                               onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={handleSubmit} type="primary" size="large">Войти в аккаунт</Button>
                    </Form.Item>
                    <Link className='auth__register-link' to='/sign-up'>Зарегистрироваться</Link>
                </Form>
            </WrapperBlock>
        </>
    )
}

export default SignInForm;