import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as liftActions from "../store/reducers/lifts"
import * as sessionActions from "../store/reducers/session"

const CreateStat = ({ authenticated }) => {
    const [errors, setErrors] = useState([])
    const [sets, setSets] = useState(0);
    let [reps, setReps] = useState(0);
    let [weight, setWeight] = useState(0);
    let [date, setDate] = useState("")
    let [difficulty, setDifficulty] = useState("")
    let [notes, setNotes] = useState("")


    const user = useSelector((x) => x.session.user)
    const lift = useSelector((x) => (x.shownLifts.lift))
    const stats = useSelector((x) => (x.shownLifts.stats))
    let dispatch = useDispatch()
    let history = useHistory()

    const closeMenu = () => {
        dispatch(sessionActions.toggleMenu(false))
    }

    const goBack = () => {
        history.push("/show-lift")
    }



    const onCreateStat = async (e) => {
        e.preventDefault();
        try {
            await dispatch(liftActions.createStat({ sets, reps, weight, date, difficulty, notes, liftId:lift.id }))
            await dispatch(liftActions.setShownLifts({liftId: lift.id}))
            await history.push("/show-lift")

        } catch (err) {
            setErrors(err);
        }
    };


    return (
        <div className="body" onClick={() => closeMenu()}>
        <div className="stat-create_container">
                <p className="table-heading">{lift ? lift.title : "Example Heading"}</p>
            <form className="stat-create_form" onSubmit={onCreateStat}>

                {/* <label htmlFor="email">Email</label> */}
                <div className="stat-create_inputs">
                    <label for="date">DATE</label>
                    <div>
                        <input
                            name="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <label for="sets">SETS</label>
                    <div>
                        <input
                            name="sets"
                            type="number"
                            placeholder="sets"
                            value={sets}
                            onChange={(e)=>setSets(e.target.value)}
                        />
                    </div>
                    <label for="reps">REPS</label>
                    <div>
                        <input
                            name="reps"
                            type="number"
                            placeholder="Reps"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                        />
                    </div>
                    <label for="weight">WEIGHT</label>
                    <div>
                        <input
                            name="weight"
                            type="number"
                            placeholder="Weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <label for="difficulty">DIFFICULTY</label>
                    <div>
                        <select
                            name="difficulty"
                            // type="text"
                            // placeholder="
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}>
                            <option disabled="true" value="">------ choose option ------</option>
                            <option value="easy">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">hard</option>
                            </select>
                    </div>
                    <label for="notes">NOTES</label>
                    <div>
                        <input
                            name="notes"
                            type="text"
                            placeholder=""
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                <div className="stat-create_buttons">
                    <button className="stat-back_button" type="button" onClick={()=>goBack()}>Back</button>
                    <button className="stat-create_button" type="submit">Create</button>
                </div>
                <div className="stat-create_errors">
                    {errors.map((error) => (
                        <div>{error}</div>
                    ))}

                </div>
            </form>

        </div>
        </div>
    );
};

export default CreateStat;
