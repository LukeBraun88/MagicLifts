import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/reducers/session"

const CreateStat = ({ authenticated, setAuthenticated }) => {
    const [sets, setSets] = useState(0);
    let [reps, setReps] = useState(0);
    let [weight, setWeight] = useState(0);
    let [date, setDate] = useState("")
    let [difficulty, setDifficulty] = useState("")
    let [notes, setNotes] = useState("")


    const user = useSelector((x) => x.session.user)

    let dispatch = useDispatch()
    let history = useHistory()

    const onCreateStat = async (e) => {
        e.preventDefault();
        const user = await login({ email: "demo@user.com", password: "DemoUser" });
        if (!user.errors) {
            dispatch(sessionActions.toggleMenu(false))
            setAuthenticated(true);
        } else {
            setErrors(user.errors);
        }
    };


    return (
        <div className="login-container">
            <form className="form-login" onSubmit={onCreateStat}>

                {/* <label htmlFor="email">Email</label> */}
                <div className="inputs-login">


                    <div>
                        <input
                            name="sets"
                            type="text"
                            placeholder="Sets"
                            value={sets}
                            onChange={(e)=>setSets(e.target.value)}
                        />
                    </div>
                    {/* <label htmlFor="password">Password</label> */}
                    <div>
                        <input
                            name="reps"
                            type="number"
                            placeholder="Reps"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name="weight"
                            type="number"
                            placeholder="Weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name="date"
                            type="date"
                            placeholder="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name="difficulty"
                            type="text"
                            placeholder="Difficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name="notes"
                            type="text"
                            placeholder="Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <div className="buttons-login">
                    <button className="login-button" type="submit">Create</button>
                </div>
                <div className="errors-login">
                    {errors.map((error) => (
                        <div>{error}</div>
                    ))}

                </div>
            </form>

        </div>
    );
};

export default CreateStat;
