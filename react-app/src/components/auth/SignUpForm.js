import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../services/auth';
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

const SignUpForm = ({ authenticated, setAuthenticated, setActiveMenu }) => {
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
        setAuthenticated(true);
        setActiveMenu('main')
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
    <div className="signup-container">
      <ThemeProvider theme={theme}>
        <form className="form-signup" onSubmit={onSignUp}>
          <div className="inputs-signup">
            <div>
              <TextField
                variant="filled"
                label="USERNAME"
                style={inputStyle}
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              />
            </div>
            <div>
              <TextField
                variant="filled"
                label="NAME"
                style={inputStyle}
                type="text"
                name="name"
                onChange={updateName}
                value={name}
              />
            </div>
            <div>
              <TextField
                variant="filled"
                label="EMAIL"
                style={inputStyle}
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              />
            </div>
            <div>
              <TextField
                variant="filled"
                label="PASSWORD"
                style={inputStyle}
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              />
            </div>
            <div>
              <TextField
                variant="filled"
                label="CONFIRM PASSWORD"
                style={inputStyle}
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              />
            </div>
            <Button style={buttonStyle} variant="contained" className="signup-button" type="submit">Sign Up</Button>
          </div>
        </form>
        <div className="errors-signup">
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default SignUpForm;
