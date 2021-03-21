import {withFormik} from "formik";
import SignInForm from "./SignInForm";
import validate from "../../../utils/validation";
import axios from "../../../utils/axios";


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
    handleSubmit: (values, {setSubmitting}) => {
        return axios.post('/user/sign-in', values).then(({data}) => {
            console.log(data)
        })
    },
    displayName: "SignInForm"
})(SignInForm);