import React from 'react';
import {Route} from "react-router";
import './AuthPage.scss';
import SignUpFormContainer from '../../core/SignUpForm/SignUpFormContainer';
import SignInFormContainer from '../../core/SignInForm/SignInFormContainer';
import CheckEmailInfo from "../../core/SignUpForm/CheckEmailInfo";

const AuthPage = () => {
    return (
        <div className='auth'>
            <div className='auth__content'>
                <Route exact path={['/', '/sign-in']} render={() => <SignInFormContainer/>}/>
                <Route exact path={'/sign-up'} render={() => <SignUpFormContainer/>}/>
                <Route exact path={'/sign-up/verify'} render={() => <CheckEmailInfo/>}/>
            </div>
        </div>
    );
}

export default AuthPage;