import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data";

const SET_SELECTED_LIFTS = "selected/setSelected";

export const setSelectedLifts = (payload) => ({
    type: SET_SELECTED_LIFTS,
    payload,
});

const DELETE_SELECTED_LIFTS = "selected/deleteSelected";

export const deleteSelectedLifts = (payload) => ({
    type: DELETE_SELECTED_LIFTS,
    payload,
});

export const setSelected = (ids) => async (dispatch) => {
    JSON.stringify(ids)
    try {
        const res = await fetch(
            `/api/lifts/selected?id=${ids}`,
            {
                method: "GET",
            }
        );
        let { data } = res.data;
        dispatch(setSelectedLifts(data));
        return data;
    } catch (error) {
        dispatch(deleteSelectedLifts());
    }
};

const selectedLifts = (state = null, action) => {
    let newState;
    switch (action.type) {
        case SET_SELECTED_LIFTS:
            newState = [...action.payload]
            return newState
        case DELETE_SELECTED_LIFTS:
            newState = null
            return newState
        default:
            return state;
    }
};

export default selectedLifts;
