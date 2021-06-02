import {withFormik} from "formik"
import SignUpForm from "./SignUpForm"
import {connect} from "react-redux"
import validation from "../../../utils/validation"
import {USER_THUNKS} from "../../../redux/actions/users"
import {SignUpPostDataType} from '../../../types/types'

type FormValues = SignUpPostDataType
interface MyFormProps {
    fetchUserRegister: (value: SignUpPostDataType) => any
    history: any
}

const SignUpFormContainer = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: () => ({
        email: "",
        fullname: "",
        password: "",
        password2: ""
    }),
    validate: values => {
        let errors = {}

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


const mapDispatchToProps = (dispatch:any) => ({
    fetchUserRegister: (postData:SignUpPostDataType) => dispatch(USER_THUNKS.fetchUserRegister(postData))
})

export default connect(null, mapDispatchToProps)(SignUpFormContainer);

