import React from 'react';
import {Link} from 'react-router-dom'
import {Form} from 'antd'
import {FormikProps} from 'formik'
import AuthWrapperBlock from '../../common/AuthWrapperBlock/AuthWrapperBlock'
import BaseButton from '../../common/Button/Button'
import FormField from "../../common/FormField/FormField"
import {SignUpPostDataType} from '../../../types/types'

type FormValues = SignUpPostDataType

const SignUpForm:React.FC<FormikProps<FormValues>> = (props) => {

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
                    // @ts-ignore
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
                        <BaseButton onClick={handleSubmit} disabled={isSubmitting}
                                    type='primary' size='large'> Зарегистрироваться
                        </BaseButton>
                    </Form.Item>
                    <Link className='auth__register-link' to='/sign-in'>Войти в аккаунт</Link>
                </Form>
            </AuthWrapperBlock>
        </>
    )
}

export default SignUpForm