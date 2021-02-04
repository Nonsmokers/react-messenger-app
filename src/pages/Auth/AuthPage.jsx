import React from 'react';
import {Route} from "react-router";
import './AuthPage.scss'
import SignInForm from "../../modules/SignInForm/SignInForm";
import SignUpFormContainer from "../../modules/SignUpForm/SignUpFormContainer";

const AuthPage = () => {
    return (
        <div className='auth'>
            <div className='auth__content'>
                <Route exact path={['/', '/sign-in']} render={() => <SignInForm/>}/>
                <Route exact path={'/sign-up'} render={() => <SignUpFormContainer/>}/>
            </div>
        </div>
    );
}

export default AuthPage;