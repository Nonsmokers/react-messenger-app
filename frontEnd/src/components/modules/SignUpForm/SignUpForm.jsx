import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Input} from 'antd';
import {InfoCircleTwoTone, LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import WrapperBlock from '../../../components/common/WrapperBlock/WrapperBlock';
import Button from '../../../components/common/Button/Button';

const SignUpForm = (props) => {

    const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
    const success = false;

    return (
        <>
            <div className='auth__title'>
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <WrapperBlock>
                {!success ? (
                    <Form name='normal_login'
                          className='login-form'
                          onSubmit={handleSubmit}
                          size={'large'}>
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
                                   hasFeedback
                        >
                            <Input id={'username'}
                                   className='auth__login-input'
                                   prefix={<UserOutlined className='site-form-item-icon'/>}
                                   placeholder='Ваше имя'
                                   value={values.username}
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
                                   type='password'
                                   placeholder='Пароль'
                                   onChange={handleChange}
                                   value={values.password}
                                   onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item className='auth__wrapper-input'
                                   validateStatus={!touched.password2 ? '' : errors.password2 ? 'error' : 'success'}
                                   hasFeedback
                        >
                            <Input id='password2'
                                   className='auth__login-input'
                                   prefix={<LockOutlined className='site-form-item-icon'/>}
                                   type="password"
                                   placeholder="Повторить Пароль"
                                   value={values.password2}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={handleSubmit} type='primary' size='large'>Зарегистрироваться</Button>
                        </Form.Item>
                        <Link className='auth__register-link' to='/sign-in'>Войти в аккаунт</Link>
                    </Form>
                ) : (<div className='auth__success-block'>
                    <div>
                        <InfoCircleTwoTone/>
                    </div>
                    <h3>Подтвердите свой аккаунт</h3>
                    <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                </div>)
                }
            </WrapperBlock>
        </>
    )
}

export default SignUpForm;