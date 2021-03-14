import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import * as sessionActions from "../../store/reducers/session"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#34c0b9',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: "black",
        "&$focused": {
          color: "#34c0b9",
          fontWeight: 600,
        },
      }
    },
    MuiFilledInput: {
      root: {
        fontWeight: 400,
        fontSize: 20,
      }
    }

  }
});

const buttonStyle = {
  borderRadius: 10,
  border: 0,
  color: 'black',
  fontSize: 16,
  fontWeight: 400,
  height: 55,
  padding: '0 30px',
}

const inputStyle = {
  width: 200,
  background: 'white',
  borderRadius: 10,
  border: 0,
  fontSize: 30,
  fontWeight: 400,
  fontFamily: 'sans-serif',
  color: 'black',
  display: 'flex',
  textAlign: 'left',
}


const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const user = useSelector((x) => x.session.user)

  let dispatch = useDispatch()
  let history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login({ email, password });
    if (!user.errors) {
      dispatch(sessionActions.toggleMenu(false))
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const user = await login({ email: "demo@user.com", password: "DemoUser" });
    if (!user.errors) {
      dispatch(sessionActions.toggleMenu(false))
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
    <div className="login-error-container">
      <ThemeProvider theme={theme}>
        <form className="login-container" onSubmit={onLogin}>

          <div>
            <TextField
              variant="filled"
              label="EMAIL"
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
              style={inputStyle}
            />
          </div>
          <div>
            <TextField
              variant="filled"
              label="PASSWORD"
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
              style={inputStyle}
            />
          </div>

          <div className="buttons-login">
            <Button style={buttonStyle} variant="contained" className="login-button" type="submit">LOGIN</Button>
            <Button style={buttonStyle} variant="contained" className="login-button" type="button" onClick={(e) => onDemoLogin(e)}>DEMO</Button>
          </div>
        </form>
        <div className="errors-login">
          {errors.map((error) => (
            <div>{error}</div>
          ))}

        </div>
      </ThemeProvider>

    </div>
  );
};

export default LoginForm;
