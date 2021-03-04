import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/auth";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      let errorsArray = []
      for (let key in user.errors){
        errorsArray.push(user.errors[key].concat("\n"))
      }
      console.log()
      alert(errorsArray.join(","))
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
        <button className="login-button" type="submit">DEMO</button>
      </div>
        <div className="errors-login">
          {/* {errors.map((error) => (
            <div>{error}</div>
          ))} */}
        </div>

    </form>
    </div>
  );
};

export default LoginForm;
