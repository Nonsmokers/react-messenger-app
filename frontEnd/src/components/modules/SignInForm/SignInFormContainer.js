import {withFormik} from "formik";
import SignInForm from "./SignInForm";
import validate from "../../../utils/validation";
import axios from "../../../utils/axios";
import openNotification from "../../../utils/openNotification";

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        password: ""
    }),
    validate: values => {
        let errors = {};
        validate({isAuth: true, values, errors});
        return errors;
    },
    handleSubmit: async (values, {setSubmitting}) => {
        const {data} = await axios.post('/user/sign-in', values)
        if (data.status === 'error') {
            openNotification({
                type: 'error',
                title: 'Ошибка',
                text: 'Неверный логин или пароль.'
            })
        } else {
            openNotification({
                type: 'success',
                title: 'Успешно',
                text: 'Вы успешно вошли.'
            })
        }
        setSubmitting(false)
        console.log(data)
    },
    displayName: "SignInForm"
})(SignInForm);