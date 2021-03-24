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
        await props.fetchUserRegister(values)

        //TODO: добавить переход на верификацию акка

        setSubmitting(false)
    },
    displayName: "SignUpForm"
})(SignUpForm);


const mapDispatchToProps = (dispatch) => ({
    fetchUserRegister: postData => dispatch(USER_ACTIONS.fetchUserRegister(postData))
});

export default connect( null , mapDispatchToProps)(SignUpFormContainer);

