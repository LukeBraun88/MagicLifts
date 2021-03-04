import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import * as sessionActions from "../../store/reducers/session"

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let dispatch = useDispatch()
  let history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login({email, password});
    // sessionActions.normalizeUserData()
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const user = await login({email:"demo@user.com", password:"DemoUser"});
    if (!user.errors) {
      // await dispatch(sessionActions.normalizeUserData({ id: user["id"] }))
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };



  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }


  return (
    <div className="login-container">
    <form className="form-login" onSubmit={onLogin}>

        {/* <label htmlFor="email">Email</label> */}
        <div className="inputs-login">


      <div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
        {/* <label htmlFor="password">Password</label> */}
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
</div>

      <div className="buttons-login">
        <button className="login-button" type="submit">LOGIN</button>
          <button className="login-button" type="button" onClick={(e) => onDemoLogin(e)}>DEMO</button>
      </div>
        <div className="errors-login">
          {errors.map((error) => (
            <div>{error}</div>
          ))}

        </div>
          </form>

    </div>
  );
};

export default LoginForm;
