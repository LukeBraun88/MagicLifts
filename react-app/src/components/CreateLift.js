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
        overrides: {
            MuiInputLabel: {
                root: {
                    color: "white",
                    "&$focused": {
                        color: "white"
                    }
                }
            },

        }
    });



const buttonStyle1 = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 10,
    border: 0,
    color: 'white',
    fontSize: 16,
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}
const buttonStyle2 = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 10,
    border: 0,
    fontSize: 16,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}

const inputStyle = {
    minWidth: 240,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 10,
    border: 0,
    fontSize: 16,
    color: 'white',
    display:'flex',
    textAlign:'left',
    // height: 48,
    // padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
            <div className="stat-create_container">
                <p className="table-heading">CREATE LIFT</p>
                <ThemeProvider theme={theme}>
                <form className="stat-create_form" noValidate autoComplete="off" onSubmit={onCreateLift}>

                    <div className="stat-create_inputs">
                        {/* <label for="title">TITLE</label> */}
                        <div>
                            <TextField
                                id="title"
                                variant="filled"
                                label="TITLE"
                                name="title"
                                type="text"
                                    // InputLabelProps={{
                                    //     classes: {
                                    //         root: classes.cssLabel,
                                    //         focused: classes.cssFocused,
                                    //     },
                                    // }}
                                // className={classes.root}
                                // InputLabelProps={{
                                //     FormLabelClasses: {
                                //         className: classes.overrides
                                //     },
                                // }}
                                value={title}
                                    style={inputStyle}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        {/* <label for="description">DESCRIPTION</label> */}
                        <div>
                            <TextField
                                multiline
                                id="description"
                                variant="filled"
                                label="DESCRIPTION"
                                name="description"
                                type="text"
                                placeholder="description"
                                rowsMax={4}
                                style={inputStyle}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        {/* <label for="bodyPart"></label> */}
                        <div>
                            <TextField
                                id="outlined-select"
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

                    <div className="stat-create_buttons">
                        <Button style={buttonStyle1} variant="contained" className="stat-back_button" type="button" onClick={() => goBack()}>Back</Button>
                        <Button style={buttonStyle2} variant="contained"className="stat-create_button" type="submit">Create</Button>
                    </div>
                    <div className="stat-create_errors">
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
