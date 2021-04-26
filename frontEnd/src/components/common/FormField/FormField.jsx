import React from 'react';
import {Form, Input} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";

const FormField = ({touched, name, placeholder, handleChange, handleBlur, errors, values, type}) => {
    return (
        <Form.Item className='auth__wrapper-input'
                   validateStatus={!touched[name] ? '' : errors[name] ? 'error' : 'success'}
                   help={!touched[name] ? ' ' : errors[name]}
                   hasFeedback
        >
            <Input id={name}
                   className='auth__login-input'
                   prefix={name === 'email'
                       ? <MailOutlined className='site-form-item-icon'/>
                       : name === 'password' || name === 'password2'
                           ? <LockOutlined className='site-form-item-icon'/>
                           : <UserOutlined className='site-form-item-icon'/>
                   }
                   placeholder={placeholder}
                   value={values[name]}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   type={type}
            />
        </Form.Item>
    )
}


export default FormField;