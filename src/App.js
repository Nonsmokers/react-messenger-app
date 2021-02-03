import React from "react";
import {Route} from "react-router-dom";

import AuthPage from "./pages/Auth/AuthPage";
import HomePage from "./pages/Home/HomePage";

const App = () => {
    return (
        <section className="App">
            <Route exact path={['/', '/sign-in', '/sign-up']} render={() => <AuthPage/>}/>
            <Route path={'/im'} render={() => <HomePage/>}/>
        </section>
    );
}

export default (App)
