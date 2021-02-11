import React from 'react';
import {Route} from 'react-router-dom';

import AuthPage from './components/pages/Auth/AuthPage';
import HomePageContainer from "./components/pages/Home/HomePage";

const App = () => {
    return (
        <section className='App'>
            <Route exact path={['/', '/sign-in', '/sign-up']} render={() => <AuthPage/>}/>
            <Route path={'/im'} render={() => <HomePageContainer/>}/>
        </section>
    );
}

export default (App)
