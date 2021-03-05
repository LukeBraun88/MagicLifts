import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../services/auth';
import * as sessionActions from "../../store/reducers/session"

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  let dispatch = useDispatch()
  let history = useHistory()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, name);
      if (!user.errors) {
        dispatch(sessionActions.toggleMenu(false))
        setAuthenticated(true);
      } else {
      setErrors(user.errors);
    }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className = "signup-container">
    <form className="form-signup" onSubmit={onSignUp}>
      <div className="inputs-signup">
      <div>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={updateName}
          value={name}
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="repeat_password"
          placeholder="repeat password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
        </div>
      <button className="signup-button" type="submit">Sign Up</button>
        <div className="errors-signup">
          {errors.map((error) => (
            <div>{error}</div>
          ))}

        </div>
    </form>
    </div>
  );
};

export default SignUpForm;
