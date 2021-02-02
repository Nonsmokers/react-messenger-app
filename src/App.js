import React from "react";
import AuthPage from "./pages/Auth/AuthPage";
import {withRouter} from "react-router-dom";

const App = () => {
    return (
        <section className="App">
            <AuthPage />
        </section>
    );
}

export default withRouter((App))
