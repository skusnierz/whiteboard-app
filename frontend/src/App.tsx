import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import { Login } from "./components/Login/Login";
import { MyRooms } from "./components/MyRooms/MyRooms";
import { Register } from "./components/Register/Register";
import { RoomList } from "./components/RoomList/RoomList";
import { WhiteBoard } from "./components/WhiteBoard/WhiteBoard";
import { Context } from "./context/appContext";

function App() {
    const [
        {
            sessionStorageContext: { username }
        }
    ] = useContext(Context);

    return (
        <Router>
            {username === "" && <Redirect to={{ pathname: "/" }} />}
            <Route exact path="/" component={Login} />
            <Route path="/white-board" component={WhiteBoard} />
            <Route path="/my-rooms" component={MyRooms} />
            <Route path="/room-list" component={RoomList} />
            <Route path="/register" component={Register} />
        </Router>
    );
}

export default App;
