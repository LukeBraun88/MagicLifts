import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as liftActions from "../store/reducers/lifts"
import * as sessionActions from "../store/reducers/session"

const CreateLift = ({ authenticated }) => {
    const [errors, setErrors] = useState([])
    const [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [bodyPart, setBodyPart] = useState("");


    const user = useSelector((x) => x.session.user)
    const lift = useSelector((x) => (x.shownLifts.lift))
    const stats = useSelector((x) => (x.shownLifts.stats))
    let dispatch = useDispatch()
    let history = useHistory()

    const closeMenu = () => {
        dispatch(sessionActions.toggleMenu(false))
    }

    const goBack = () => {
        history.back()
    }



    const onCreateLift = async (e) => {
        e.preventDefault();
        try {
            await dispatch(liftActions.createLift({ title, description, bodyPart }))
            await dispatch(sessionActions.normalizeUserData({ id: user.id }))
            await history.push("/show-lift")

        } catch (err) {
            setErrors(err);
        }
    };


    return (
        <div className="body" onClick={() => closeMenu()}>
            <div className="stat-create_container">
                <p className="table-heading">CREATE LIFT</p>
                <form className="stat-create_form" onSubmit={onCreateLift}>

                    <div className="stat-create_inputs">
                        <label for="title">TITLE</label>
                        <div>
                            <input
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <label for="description">DESCRIPTION</label>
                        <div>
                            <input
                                name="description"
                                type="text"
                                placeholder="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <label for="bodyPart">BODY PART</label>
                        <div>
                            <select
                                name="bodyPart"
                                value={bodyPart}
                                onChange={(e) => setBodyPart(e.target.value)}>
                                <option disabled="true" value="">------ choose option ------</option>
                                <option value="Shoulders">Shoulders</option>
                                <option value="Abs">Abs</option>
                                <option value="Chest">Chest</option>
                                <option value="Arms">Arms</option>
                                <option value="Back">Back</option>
                                <option value="Legs">Legs</option>
                            </select>
                        </div>

                    </div>

                    <div className="stat-create_buttons">
                        <button className="stat-back_button" type="button" onClick={() => goBack()}>Back</button>
                        <button className="stat-create_button" type="submit">Create</button>
                    </div>
                    <div className="stat-create_errors">
                        {/* {errors.map((error) => (
                            <div>{error}</div>
                        ))} */}

                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateLift;
