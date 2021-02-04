import {withFormik} from "formik";
import SignInForm from "./SignInForm";
import validateForm from "utils/validate";

export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        password: ""
    }),
    validate: values => {
        let errors = {};
        validateForm({isAuth: false, values, errors});
        return errors;
    },
    handleSubmit: (values, {setSubmitting}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },
    displayName: "SignInForm"
})(SignInForm);