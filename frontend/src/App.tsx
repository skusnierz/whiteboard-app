import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { WhiteBoard } from "./components/WhiteBoard/WhiteBoard";
import { Context } from "./context/appContext";

function App() {
    const [{ name }] = useContext(Context);

    return (
        <Router>
            {name === "" ? (
                <Redirect to={{ pathname: "/" }} />
            ) : (
                <Redirect to={{ pathname: "/white-board" }} />
            )}
            <Route exact path="/" component={Login} />
            <Route path="/white-board" component={WhiteBoard} />
        </Router>
    );
}

export default App;
