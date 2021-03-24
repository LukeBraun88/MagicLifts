import React from "react";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { logoutSessionUser } from "../../store/reducers/session"
import Button from '@material-ui/core/Button';
import * as sessionActions from "../../store/reducers/session"
import * as graphActions from "../../store/reducers/graphData"
import * as selectActions from "../../store/reducers/selected"
const buttonStyle = {
  borderRadius: 10,
  border: 0,
  color: 'black',
  fontSize: 16,
  fontWeight: 400,
  height: 60,
  padding: '0 30px',
}

const LogoutButton = ({ setAuthenticated, setActiveMenu }) => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(logoutSessionUser());
    dispatch(sessionActions.toggleMenu(false))
    dispatch(selectActions.deleteSelectedLifts())
    dispatch(graphActions.deleteGraphData())
    return <Redirect to="/" />
  };

  return (

    <div className="logout">
      {/* <p className="logout-text">U SURE ?</p> */}
      <div className="logout_buttons">
        {/* <Button style={buttonStyle} variant="contained" className="logout_button" type="button" onClick={() => setActiveMenu('main')}>GO BACK</Button> */}
          <Button style={buttonStyle} variant="contained" className="logout_button" type="button" onClick={() => onLogout()}>LOGOUT</Button>
      </div>
    </div>

  )
};

export default LogoutButton;
