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
    try {
        const res = await fetch(
            `/api/lifts/graph?id=${ids}`,
            {
                method: "GET",
            }
        );
        let { data } = res.data;
        dispatch(setGraphData(data));
        return data;
    } catch (error) {
        dispatch(deleteGraphData());
    }
};



const graphData = (state = null, action) => {
    let newState;
    switch (action.type) {
        case SET_GRAPH_DATA:
            newState = [...action.payload ]
            return newState
        case DELETE_GRAPH_DATA:
            newState = null
            return newState
        default:
            return state;
    }
};

export default graphData;
