import { useSelector } from "react-redux";
import { fetch } from "../../services/fetch";
import { normalizedData, normalizedBodyPartData } from "../../services/normalize_data"

// Action constants
const SET_GRAPH_DATA = "graphData/setGraphData";
const DELETE_GRAPH_DATA = "graphData/deleteGraphData";

export const setGraphData = (payload) => ({
    type: SET_GRAPH_DATA,
    payload,
});

export const deleteGraphData = (payload) => ({
    type: DELETE_GRAPH_DATA,
    payload,
});


export const setGraphLifts = (ids) => async (dispatch) => {
    JSON.stringify(ids)
    const res = await fetch(
        `/api/lifts/graph?id=${ids}`,
        {
            method: "GET",
        }
    );
    let { data } = res.data;
    console.log("---------data:", data)
    // data = normalizedData(data)
    dispatch(setGraphData(data));
    return data;
};



const graphData = (state = null, action) => {
    let newState;
    switch (action.type) {
        case SET_GRAPH_DATA:
            newState = { ...action.payload }
            return newState
        // case DELETE_GRAPH_DATA:
        //     newState = { ...state }
        //     delete newState[action.payload.id]
        //     return newState
        default:
            return state;
    }
};

export default graphData;
