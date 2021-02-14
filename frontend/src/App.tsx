import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { WhiteBoard } from "./components/WhiteBoard/WhiteBoard";
import { Context } from "./context/appContext";

function App() {
    const [{ username }] = useContext(Context);

    return (
        <Router>
            {username === "" ? (
                <Redirect to={{ pathname: "/" }} />
            ) : (
                <Redirect to={{ pathname: "/white-board" }} />
            )}
            <Route exact path="/" component={Login} />
            <Route path="/white-board" component={WhiteBoard} />
            <Route path="/register" component={Register} />
        </Router>
    );
}

export default App;
