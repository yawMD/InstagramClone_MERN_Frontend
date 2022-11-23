import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./components/MainComponents/Login"
import Profile from "./Pages/Profile";
import SignUp from "./components/MainComponents/Signup"
import MakePost from "./components/MainComponents/MakePost"
import AdminLogin from "./Pages/Admin/AdminLogin"
import Messages from "./components/MainComponents/Messages";
import StoryDisp from "./components/MainComponents/StoryDisp"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/user/profile">
          <Profile />
        </Route>
        <Route exact path="/login">
        <Login />

        </Route>
        <Route exact path="/signup">
        <SignUp />
      </Route>

      <Route exact path="/postscreen">
        <MakePost />
      </Route>

      <Route exact path="/chats">
      <Messages />
    </Route>

    <Route exact path="/storydisplay">
    <StoryDisp />
  </Route>

      <Route exact path="/admin">
      <AdminLogin />
    </Route>

      </Switch>
    </Router>
  );
}

export default App;
