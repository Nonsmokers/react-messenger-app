import React from 'react';
import {Form} from 'antd';
import {Link} from 'react-router-dom';
import Button from '../../common/Button/Button';
import AuthWrapperBlock from '../../common/AuthWrapperBlock/AuthWrapperBlock';
import FormField from "../../common/FormField/FormField";

const SignInForm = (props) => {

    const {values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting} = props;

    return (
        <>
            <div className='auth__title'>
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <AuthWrapperBlock>
                <Form name='normal_login'
                      className='login-form'
                      onSubmit={handleSubmit}
                      size={'large'}>
                    <FormField name={'email'} values={values} touched={touched} handleChange={handleChange}
                               errors={errors} handleBlur={handleBlur} placeholder={'E-mail'} type={'text'}
                    />
                    <FormField name={'password'} touched={touched} values={values} handleChange={handleChange}
                               errors={errors} handleBlur={handleBlur} placeholder={'Введите пароль'} type={'password'}
                    />
                    <Form.Item>
                        <Button onClick={handleSubmit} disabled={isSubmitting} type='primary' size='large'>Войти в
                            аккаунт</Button>
                    </Form.Item>
                    <Link className='auth__register-link' to='/sign-up'>Зарегистрироваться</Link>
                </Form>
            </AuthWrapperBlock>
        </>
    )
}

export default SignInForm;