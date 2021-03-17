
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as liftActions from "../store/reducers/lifts"
import * as sessionActions from "../store/reducers/session"
import { NavLink } from "react-router-dom";

function LandingPage() {
    let dispatch = useDispatch()
    let history = useHistory()

    const closeMenu = () => {
        dispatch(sessionActions.toggleMenu(false))
    }

    return (
        <div className="body" onClick={() => closeMenu()}>
            <div className="landing-container"></div>
            <div className="landing-circle">
            <div className="landing-heading">MAGIC LIFTS</div>

            </div>

        </div>
    )
}

export default LandingPage;
