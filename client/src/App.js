import React, {useEffect} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import AuthPage from './components/pages/Auth/AuthPage';
import USER_ACTIONS from './redux/actions/users';
import HomePageContainer from "./components/pages/Home/HomePageContainer";

const App = ({isAuthenticated, autoLogin}) => {
console.log('aaa')
    useEffect(() => {
        autoLogin()
    }, [])

    let routes = (
        <Switch>
            <Route exact path={['/', '/sign-in', '/sign-up', '/sign-up/verify']} render={() => <AuthPage/>}/>
            <Redirect to={'/'}/>
        </Switch>
    )
    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path={['/dialogs']} render={() => <HomePageContainer/>}/>
                <Redirect to={'/dialogs'}/>
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
    isAuthenticated: selectIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch) => ({
    autoLogin: () => dispatch(USER_ACTIONS.autoLogin())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
