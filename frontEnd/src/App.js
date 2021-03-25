import React, {useEffect} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import AuthPage from './components/pages/Auth/AuthPage';
import HomePageContainer from "./components/pages/Home/HomePage";
import USER_ACTIONS from './redux/actions/users';

const App = (props) => {

    useEffect(() => {
        props.autoLogin()
    }, [])

    let routes = (
        <Switch>
            <Route exact path={['/', '/sign-in', '/sign-up', '/sign-up/verify']} render={() => <AuthPage/>}/>
            <Redirect to={'/'}/>
        </Switch>
    )
    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path={'/im'} render={() => <HomePageContainer/>}/>
                <Redirect to={'/im'}/>
            </Switch>
        )
    }

    return (
        <section className='App'>
            {routes}
        </section>
    );
}

const selectIsAuthenticated = state => state.usersReducer.signedIn

const mapStateToProps = (state) => ({
    isAuthenticated: selectIsAuthenticated(state)
});

const mapDispatchToProps = (dispatch) => ({
    autoLogin: () => dispatch(USER_ACTIONS.autoLogin())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
