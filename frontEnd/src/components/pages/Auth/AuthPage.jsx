import React from 'react';
import {Route} from "react-router";
import './AuthPage.scss';
import SignUpFormContainer from '../../core/SignUpForm/SignUpFormContainer';
import SignInFormContainer from '../../core/SignInForm/SignInFormContainer';
import CheckEmailInfo from "../../core/SignUpForm/CheckEmailInfo";

const AuthPage = () => {
    //http://localhost:3000/user/verify?hash=$2b$10$6whv35dLjF.yK63Tl6et9e36EmyZnaD2ZJcarzVn44I6GtMRIjpcC
    return (
        <div className='auth'>
            <div className='auth__content'>
                <Route exact path={['/', '/sign-in']} render={() => <SignInFormContainer/>}/>
                <Route exact path={'/sign-up'} render={() => <SignUpFormContainer/>}/>
                <Route path={'/sign-up/verify'} component={CheckEmailInfo} />
            </div>
        </div>
    );
}

export default AuthPage;