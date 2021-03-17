
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as liftActions from "../store/reducers/lifts"
import * as sessionActions from "../store/reducers/session"
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
const buttonStyle = {
    borderRadius: 10,
    border: 0,
    color: 'black',
    fontSize: 16,
    fontWeight: 400,
    height: 60,
    padding: '0 30px',
}

function DeleteLift() {
    let dispatch = useDispatch()
    let history = useHistory()
    const lift = useSelector((x) => (x.shownLifts.lift))
    const user = useSelector((x) => x.session.user)

    const closeMenu = () => {
        dispatch(sessionActions.toggleMenu(false))
    }

    const deleteLift = async () => {
        await dispatch(liftActions.deleteLift({ liftId: lift.id }))
        await dispatch(sessionActions.normalizeUserData({ id: user.id }))
    }

    const goBack = () => {
        history.push("/show-lift")
    }

    return (
        <div className="body" onClick={() => closeMenu()}>
            {lift !== "deleted" ?
                <div className="lift-delete">
                    <p className="lift-delete-text">ARE YOU POSITIVE?</p>
                    <div className="stat-create_buttons">
                        <Button style={buttonStyle} variant="contained" className="stat-back_button" type="button" onClick={() => goBack()}>Back</Button>
                        <Button style={buttonStyle} variant="contained" className="stat-create_button" type="button" onClick={() => deleteLift()}>Delete</Button>
                    </div>
                </div>
            :
            <div className="lift-delete">
                <p className="lift-delete-text">LIFT DELETED</p>
            </div>
}

        </div>
    )
}

export default DeleteLift;
