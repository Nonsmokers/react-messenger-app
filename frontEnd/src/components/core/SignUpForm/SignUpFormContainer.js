import {withFormik} from "formik";
import SignUpForm from "./SignUpForm";
import validation from "../../../utils/validation";

export default withFormik({
    mapPropsToValues: () => ({
        email: "",
        username: "",
        password: "",
        password2: ""
    }),
    validate: values => {
        let errors = {};

        validation({isAuth: false, values, errors})

        return errors;
    },
    handleSubmit: (values, {setSubmitting, props}) => {
        props.fetchUserRegister(values)
        setSubmitting(false)
    },
    displayName: "SignUpForm"
})(SignUpForm);

