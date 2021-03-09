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
                        fontWeight:600,
                    },
                }
            },
            MuiFilledInput:{
                root:{
                    fontWeight:400,
                    fontSize: 20,
                }
            }

        }
    });


const buttonStyle = {
    // background: 'linear-gradient(45deg, #34c0b9 30%, #f14d8a 90%)',
    borderRadius: 10,
    border: 0,
    color: 'black',
    fontSize: 16,
    fontWeight: 400,
    height: 55,
    padding: '0 30px',
    // boxShadow: '0 3px 5px 2px #34c0b9',
}

const inputStyle = {
    width: 240,
    background: 'linear-gradient(45deg, white 30%, white 90%)',
    borderRadius: 10,
    border: 0,
    fontSize: 30,
    fontWeight: 400,
    fontFamily:'sans-serif',
    color: 'black',
    display:'flex',
    textAlign:'left',
    // height: 48,
    // padding: '0 30px',
    // boxShadow: '0 3px 2px 2px white',
}


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

    const goBack = async () => {
        window.history.back()
        window.history.back()
    }


    // const classes = useStyles();

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
            <div className="lift-create_container">
                <p className="table-heading">CREATE LIFT</p>
                <ThemeProvider theme={theme}>
                <form className="lift-create_form" noValidate autoComplete="off" onSubmit={onCreateLift}>
                    <div className="lift-create_inputs">
                        <div>
                            <TextField
                                id="title"
                                variant="filled"
                                label="TITLE"
                                name="title"
                                type="text"
                                value={title}
                                style={inputStyle}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                multiline
                                id="description"
                                variant="filled"
                                label="DESCRIPTION"
                                name="description"
                                type="text"
                                // placeholder="Description"
                                rowsMax={4}
                                style={inputStyle}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                id="bodypart_select"
                                select
                                name="bodyPart"
                                label="BODY PART"
                                value={bodyPart}
                                variant="filled"
                                style={inputStyle}
                                onChange={(e) => setBodyPart(e.target.value)}>
                                <MenuItem disabled="true" value="">------ choose MenuItem ------</MenuItem>
                                <MenuItem value="Shoulders">Shoulders</MenuItem>
                                <MenuItem value="Abs">Abs</MenuItem>
                                <MenuItem value="Chest">Chest</MenuItem>
                                <MenuItem value="Arms">Arms</MenuItem>
                                <MenuItem value="Back">Back</MenuItem>
                                <MenuItem value="Legs">Legs</MenuItem>
                            </TextField>
                        </div>

                    </div>

                    <div className="lift-create_buttons">
                        <Button style={buttonStyle} variant="contained" className="lift-back_button" type="button" onClick={() => goBack()}>Back</Button>
                        <Button style={buttonStyle} variant="contained"className="lift-create_button" type="submit">Create</Button>
                    </div>
                    <div className="lift-create_errors">
                        {/* {errors.map((error) => (
                            <div>{error}</div>
                        ))} */}

                    </div>
                </form>
                    </ThemeProvider>


            </div>
        </div>
    );
};

export default CreateLift;
