import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data";

const SET_CLICKED_LIFTS = "clicked/setClicked";
const DELETE_CLICKED_LIFTS = "clicked/deleteClicked";

export const setClickedLifts = (payload) => ({
    type: SET_CLICKED_LIFTS,
    payload,
});

export const deleteClickedLifts = (payload) => ({
    type: DELETE_CLICKED_LIFTS,
    payload,
});

// export const setClicked = (ids) => async (dispatch) => {
//     JSON.stringify(ids)
//     try {
//         const res = await fetch(
//             `/api/lifts/clicked?id=${ids}`,
//             {
//                 method: "GET",
//             }
//         );
//         let { data } = res.data;
//         dispatch(setClickedLifts(data));
//         return data;
//     } catch (error) {
//         dispatch(deleteClickedLifts());
//     }
// };

const clickedLiftIds = (state = null, action) => {
    let newState;
    switch (action.type) {
        case SET_CLICKED_LIFTS:
            newState = [...action.payload]
            return newState
        case DELETE_CLICKED_LIFTS:
            newState = null
            return newState
        default:
            return state;
    }
};

export default clickedLiftIds;
