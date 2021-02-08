import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { WhiteBoard } from "./components/WhiteBoard/WhiteBoard";
import UserData from "./context/appContext";

function App() {
    return (
        <UserData>
            <Router>
                <Route exact path="/" component={Login} />
                <Route path="/white-board" component={WhiteBoard} />
            </Router>
        </UserData>
    );
}

export default App;
