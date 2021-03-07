import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as liftActions from "../store/reducers/lifts"
import * as sessionActions from "../store/reducers/session"


const Chart = ({authenticated}) => {
    const user = useSelector((x) => x.session.user)
    const lift = useSelector((x) => (x.shownLifts.lift))
    const stats = useSelector((x) => (x.shownLifts.stats))
    let dispatch = useDispatch()
    let history = useHistory()

    const closeMenu = () => {
        dispatch(sessionActions.toggleMenu(false))
    }

    const goBack = async () => {
        window.history.back()
        window.history.back()
    }


    return(
        <div className="body" onClick={() => closeMenu()}>

        </div>
    )
}

export default Chart;
