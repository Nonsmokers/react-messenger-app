import {withFormik} from "formik";
import SignUpForm from "./SignUpForm";

export default withFormik({
    mapPropsToValues: () => ({
        email: "",
        username: "",
        password: "",
        password2: ""
    }),
    validate: values => {
        let errors = {};
        console.log(errors)
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address format";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(values.password)) {
            errors.password = "Invalid password format";
        }

        return errors;
    },
    handleSubmit: (values, {setSubmitting}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },
    displayName: "SignUpForm"
})(SignUpForm);