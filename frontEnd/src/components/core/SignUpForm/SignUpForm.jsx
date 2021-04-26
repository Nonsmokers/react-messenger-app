import React from 'react';
import {Link} from 'react-router-dom';
import {Form} from 'antd';
import AuthWrapperBlock from '../../common/AuthWrapperBlock/AuthWrapperBlock';
import Button from '../../common/Button/Button';
import FormField from "../../common/FormField/FormField";

const SignUpForm = (props) => {

    const {values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting} = props;

    return (
        <>
            <div className='auth__title'>
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <AuthWrapperBlock>
                    <Form name='normal_login'
                          className='login-form'
                          onSubmit={handleSubmit}
                          size={'large'}>
                        <FormField
                            name={'email'} values={values} touched={touched} handleChange={handleChange}
                            errors={errors} handleBlur={handleBlur} placeholder={'E-mail'} type={'text'}
                        />
                        <FormField
                            name={'fullname'} values={values} touched={touched} handleChange={handleChange}
                            errors={errors} handleBlur={handleBlur} placeholder={'Ваше имя'} type={'text'}
                        />
                        <FormField
                            name={'password'} touched={touched} values={values} handleChange={handleChange}
                            errors={errors} handleBlur={handleBlur} placeholder={'Введите пароль'} type={'password'}
                        />
                        <FormField
                            name={'password2'} touched={touched} values={values} handleChange={handleChange}
                            errors={errors} handleBlur={handleBlur} placeholder={'Повторить Пароль'} type={'password'}
                        />
                        <Form.Item>
                            <Button onClick={handleSubmit} disabled={isSubmitting}
                                    type='primary' size='large'> Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <Link className='auth__register-link' to='/sign-in'>Войти в аккаунт</Link>
                    </Form>
            </AuthWrapperBlock>
        </>
    )
}

export default SignUpForm;