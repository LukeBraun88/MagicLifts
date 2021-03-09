import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import * as liftActions from "../store/reducers/lifts"
import * as sessionActions from "../store/reducers/session"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import InputAdornment from '@material-ui/core/InputAdornment';

const CreateStat = ({ authenticated }) => {
    const [errors, setErrors] = useState([])
    const [sets, setSets] = useState();
    let [reps, setReps] = useState();
    let [weight, setWeight] = useState();
    let [date, setDate] = useState()
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
            await dispatch(liftActions.createStat({ sets, reps, weight, date, difficulty, notes, liftId: lift.id }))
            await dispatch(liftActions.setShownLifts({ liftId: lift.id }))
            await history.push("/show-lift")
        } catch (err) {
            setErrors(err);
        }
    };

    const buttonStyle = {
        // background: 'linear-gradient(45deg, #34c0b9 30%, #f14d8a 90%)',
        borderRadius: 10,
        border: 0,
        color: 'black',
        fontSize: 16,
        fontWeight: 400,
        height: 60,
        padding: '0 30px',
        // boxShadow: '0 3px 5px 2px #34c0b9',
    }

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

    const inputStyle = {
        width: 240,
        background: 'linear-gradient(45deg, white 30%, white 90%)',
        borderRadius: 10,
        border: 0,
        fontSize: 30,
        fontWeight: 400,
        fontFamily: 'sans-serif',
        color: 'black',
        display: 'flex',
        textAlign: 'left',
        // height: 48,
        // padding: '0 30px',
        // boxShadow: '0 3px 2px 2px white',
    }



    return (
        <div className="body" onClick={() => closeMenu()}>
            <div className="stat-create_container">
                <p className="table-heading">{lift ? lift.title : "Example Heading"}</p>
                <ThemeProvider theme={theme}>
                    <form className="stat-create_form" onSubmit={onCreateStat}>

                        <div className="stat-create_inputs">
                            <div className="create-1">


                                <TextField
                                    label="SETS"
                                    variant="filled"
                                    style={inputStyle}
                                    name="sets"
                                    type="number"
                                    placeholder="sets"
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                />


                                <TextField
                                    label="REPS"
                                    variant="filled"
                                    style={inputStyle}
                                    name="reps"
                                    type="number"
                                    placeholder="reps"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.value)}
                                />


                                <TextField
                                    label="WEIGHT"
                                    variant="filled"
                                    style={inputStyle}
                                    name="weight"
                                    type="number"
                                    placeholder="weight"
                                    value={weight}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">lb</InputAdornment>,
                                    }}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                                <TextField
                                    id="difficulty_select"
                                    name="difficulty"
                                    select
                                    label="DIFFICULTY"
                                    value={difficulty}
                                    variant="filled"
                                    style={inputStyle}
                                    onChange={(e) => setDifficulty(e.target.value)}>
                                    <MenuItem disabled="true" value="">------ choose MenuItem ------</MenuItem>
                                    <MenuItem value="easy">easy</MenuItem>
                                    <MenuItem value="medium">medium</MenuItem>
                                    <MenuItem value="hard">hard</MenuItem>
                                </TextField>
                            </div>

                            <div className="create-2">
                                <TextField
                                    label="DATE"
                                    variant="filled"
                                    style={inputStyle}
                                    name="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />





                                <TextField
                                    multiline
                                    id="notes"
                                    variant="filled"
                                    label="NOTES"
                                    name="notes"
                                    type="text"
                                    rowsMax={4}
                                    style={inputStyle}
                                    placeholder="notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                                <div className="stat-create_buttons">
                                    <Button style={buttonStyle} variant="contained" className="stat-back_button" type="button" onClick={() => goBack()}>Back</Button>
                                    <Button style={buttonStyle} variant="contained" className="stat-create_button" type="submit">Create</Button>
                                </div>
                                </div>
                            </div>

                        <div className="stat-create_errors">
                            {errors.map((error) => (
                                <div>{error}</div>
                            ))}

                        </div>
                    </form>
                </ThemeProvider>
            </div>
        </div>
    );
};

export default CreateStat;
