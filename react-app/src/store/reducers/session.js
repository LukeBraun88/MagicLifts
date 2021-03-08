import { useSelector } from "react-redux";
import { fetch } from "../../services/fetch";
import {normalizedData, normalizedBodyPartData} from "../../services/normalize_data"

// Action constants
const SET_SESSION_USER = "session/setSessionUser";
const LOGIN_SESSION_USER = "session/loginSessionUser";
const LOGOUT_SESSION_USER = "session/logoutSessionUser";
const NORMALIZE_USER_DATA = "session/normalizeUserData";
const TOGGLE_MENU = "session/toggleMenu";

// State template
const userTemplate = {
    id: null,
    username: null,
    name: null,
    email: null,
    bodyParts: [],
};

// Action creators
const loginSessionUserActionCreator = (payload) => ({
    type: LOGIN_SESSION_USER,
    payload,
});

const normalizeUserDataActionCreator = (payload) => ({
    type: NORMALIZE_USER_DATA,
    payload,
});

const logoutSessionUserActionCreator = (payload) => ({
    type: LOGOUT_SESSION_USER,
    payload,
});

export const setSessionUser = (payload) => ({
    type: SET_SESSION_USER,
    payload,
});

export const toggleMenu = (payload) => ({
    type: TOGGLE_MENU,
    payload,
});



export const normalizeUserData = ({id}) => async (dispatch) => {
    const res = await fetch(
        `/api/users/${id}`,
        {
            method: "GET",
        }
    );
    const { data } = res.data;

    let lifts = []
    for (let i = 0; i < data.bodyParts.length; i++) {
        let bodyPart = data.bodyParts[i];
        for (let j = 0; j < bodyPart.lifts.length; j++) {
            let lift = bodyPart.lifts[j];
            lifts.push(lift)
            lift.stats = normalizedData(lift.stats);
        }
        bodyPart.lifts = normalizedData(bodyPart.lifts);
    }
    data.lifts = lifts
    data.bodyParts = normalizedBodyPartData(data.bodyParts);

    dispatch(normalizeUserDataActionCreator(data));
    return data;
};

// Thunks
export const loginSessionUser = ({ email, password }) => async (dispatch) => {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
    const { data } = res.data;
    dispatch(loginSessionUserActionCreator(data));
    return data;
};
export const logoutSessionUser = () => async (dispatch) => {
    dispatch(logoutSessionUserActionCreator(userTemplate));
    return;
};

// const menuTemplate = {
//     open:true
// };

// Reducer configuration

const menuDefault = false
const reducer = (state = {user: userTemplate, menu: menuDefault}, action) => {
    let newState;
    switch (action.type) {
        case NORMALIZE_USER_DATA:
            newState = { ...state, user: action.payload }
            return newState
        case LOGOUT_SESSION_USER:
            newState = {...state, user: userTemplate}
            return newState
        case TOGGLE_MENU:
            newState = { ...state, menu: action.payload }
            return newState
        default:
            return state;
    }
};

export default reducer;
