import React from "react";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { logoutSessionUser } from "../../store/reducers/session"

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    dispatch(logoutSessionUser());
    return <Redirect to="/" />
  };

  return <Link className="hb_link" to="/" onClick={onLogout}>

    <span className="hb_link_text">Logout</span>
  </Link>;
};

export default LogoutButton;
