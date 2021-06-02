import {FormikErrors, withFormik} from "formik"
import {connect} from "react-redux"
import SignInForm from "./SignInForm"
import validate from "../../../utils/validation"
import {USER_THUNKS} from "../../../redux/actions/users"
import {RootStateType} from '../../../redux/rootReducer'
import {SignInPostDataType, UserType} from '../../../types/types'

type FormValues = SignInPostDataType

interface FormProps {
    fetchUserLogin: (value: SignInPostDataType) => void;
    currentUserData: UserType | null
}

const SignInFormContainer = withFormik<FormProps, FormValues>({

    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: "",
        password: "",
        isLogin: true
    }),
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        validate({isAuth: true, values, errors});
        return errors;
    },
    handleSubmit: async (values, {setSubmitting, props}) => {
        await props.fetchUserLogin(values)
        setSubmitting(false)
    },
    displayName: "SignInForm"
})(SignInForm)

const selectCurrentUserData = (state: RootStateType) => state.usersReducer.currentUserData

const mapStateToProps = (state: RootStateType) => ({
    currentUserData: selectCurrentUserData(state)
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchUserLogin: (postData: any) => dispatch(USER_THUNKS.fetchUserLogin(postData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormContainer)