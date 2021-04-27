import {withFormik} from "formik";
import {connect} from "react-redux";
import SignInForm from "./SignInForm";
import validate from "../../../utils/validation";

import USER_ACTIONS from "../../../redux/actions/users";

const SignInFormContainer = withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        password: "",
        isLogin: true
    }),
    validate: values => {
        let errors = {};
        validate({isAuth: true, values, errors});
        return errors;
    },
    handleSubmit: async (values, {setSubmitting, props}) => {
        await props.fetchUserLogin(values)
        setSubmitting(false)
    },
    displayName: "SignInForm"
})(SignInForm);

const selectCurrentUserData = state => state.usersReducer.currentUserData

const mapStateToProps = (state) => ({
    currentUserData: selectCurrentUserData(state)
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserLogin: postData => dispatch(USER_ACTIONS.fetchUserLogin(postData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormContainer);