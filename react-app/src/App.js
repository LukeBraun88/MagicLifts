import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import {NavBar, NavItem, DropDownMenu } from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import * as sessionActions from "./store/reducers/session";
import LandingPage from "./components/LandingPage";
import triangleDownIcon from "./images/icons/triangle-down.png"
import {CSSTransition} from 'react-transition-group'


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(sessionActions.setSessionUser(user));
      }
      setLoaded(true);
    })();
  }, [authenticated]); //this was empty --> do we need authenticated?

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar authenticated={authenticated} //this didn't have authenticated. do we need it?
        setAuthenticated={setAuthenticated}>

        <NavItem >
          <DropDownMenu authenticated={authenticated} //this didn't have authenticated. do we need it?
            setAuthenticated={setAuthenticated}/>
      </NavItem>

      </NavBar>
      <Switch>
        {/* <Route path="/" exact={true}>
          <LandingPage />
        </Route> */}
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
