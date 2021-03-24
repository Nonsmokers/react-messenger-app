import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from 'antd';
import {InfoCircleTwoTone} from '@ant-design/icons';
import AuthWrapperBlock from '../../common/AuthWrapperBlock/AuthWrapperBlock';
import Button from '../../common/Button/Button';
import FormField from "../../common/FormField/FormField";

const SignUpForm = (props) => {

    const {values, touched, errors, handleChange, handleBlur, handleSubmit} = props;
    const success = false;

    return (
        <>
            <div className='auth__title'>
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <AuthWrapperBlock>
                {!success ? (
                    <Form name='normal_login'
                          className='login-form'
                          onSubmit={handleSubmit}
                          size={'large'}>
                        <FormField
                            name={'email'} values={values} touched={touched} handleChange={handleChange}
                            errors={errors} handleBlur={handleBlur} placeholder={'E-mail'} type={'text'}
                        />
                        <FormField
                            name={'username'} values={values} touched={touched} handleChange={handleChange}
                            errors={errors} handleBlur={handleBlur} placeholder={'Ваше имя'} type={'text'}
                        />
                        <FormField
                            name={'password'} touched={touched} values={values} handleChange={handleChange}
                            errors={errors} handleBlur={handleBlur} placeholder={'Введите пароль'}
                            type={'password'}
                        />
                        <FormField
                            name={'password2'} touched={touched} values={values} handleChange={handleChange}
                            errors={errors} handleBlur={handleBlur} placeholder={'Повторить Пароль'} type={'password'}
                        />
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
            </AuthWrapperBlock>
        </>
    )
}

export default SignUpForm;