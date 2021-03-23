import React from 'react';
import {Route} from "react-router";
import './AuthPage.scss';
import SignUpFormContainer from '../../core/SignUpForm/SignUpFormContainer';
import SignInFormContainer from '../../core/SignInForm/SignInFormContainer';

const AuthPage = () => {
    return (
        <div className='auth'>
            <div className='auth__content'>
                <Route exact path={['/', '/sign-in']} render={() => <SignInFormContainer/>}/>
                <Route exact path={'/sign-up'} render={() => <SignUpFormContainer/>}/>
            </div>
        </div>
    );
}

export default AuthPage;