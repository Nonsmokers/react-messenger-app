import {withFormik} from "formik";
import SignInForm from "./SignInForm";
import validate from "../../utils/validation";

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
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },
    displayName: "SignInForm"
})(SignInForm);