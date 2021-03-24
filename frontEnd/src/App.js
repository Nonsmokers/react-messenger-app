import React, {useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from "react-redux";

import AuthPage from './components/pages/Auth/AuthPage';
import HomePageContainer from "./components/pages/Home/HomePage";
import USER_ACTIONS from './redux/actions/users';

const App = (props) => {

    useEffect(() => {
        props.autoLogin()
    }, [])

    return (
        <section className='App'>
            {props.isAuthenticated ? <Redirect to='/im'/> : <Redirect to='/'/>}
            <Route exact path={['/', '/sign-in', '/sign-up', "/sign-up/verify"]} render={() => <AuthPage/>}/>
            <Route path={'/im'} render={() => <HomePageContainer/>}/>
        </section>
    );
}

const selectIsAuthenticated = state => state.usersReducer.signedIn

const mapStateToProps = (state) => ({
    isAuthenticated: !!selectIsAuthenticated(state)
});

const mapDispatchToProps = (dispatch) => ({
    autoLogin: () => dispatch(USER_ACTIONS.autoLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
