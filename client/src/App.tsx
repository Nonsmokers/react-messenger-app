import React, {useEffect} from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"

import AuthPage from './components/pages/Auth/AuthPage'
import {USER_THUNKS} from './redux/actions/users'
import HomePageContainer from "./components/pages/Home/HomePageContainer"
import {RootStateType} from './redux/rootReducer'

const App: React.FC = () => {

    const isAuthenticated = useSelector(selectIsAuthenticated)

    const dispatch = useDispatch()

    const autoLogin = () => dispatch(USER_THUNKS.autoLogin())

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
    )
}

const selectIsAuthenticated = (state: RootStateType) => state.usersReducer.signedIn

export default withRouter(App)