import {withFormik} from "formik";
import SignUpForm from "./SignUpForm";
import validation from "../../../utils/validation";

import USER_ACTIONS from "../../../redux/actions/users";
import {connect} from "react-redux";

const SignUpFormContainer = withFormik({
    mapPropsToValues: () => ({
        email: "",
        fullname: "",
        password: "",
        password2: ""
    }),
    validate: values => {
        let errors = {};

        validation({isAuth: false, values, errors})

        return errors;
    },

    handleSubmit: async (values, {setSubmitting, props}) => {
        const res = await props.fetchUserRegister(values)
        if (res && res.status === 200) {
            props.history.push('/sign-up/verify');
        }
        setSubmitting(false)
    },
    displayName: "SignUpForm"
})(SignUpForm);


const mapDispatchToProps = (dispatch) => ({
    fetchUserRegister: postData => dispatch(USER_ACTIONS.fetchUserRegister(postData))
});

export default connect(null, mapDispatchToProps)(SignUpFormContainer);

