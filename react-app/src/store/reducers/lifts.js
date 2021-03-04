import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data";

const SET_CURRENT_LIFTS = "lifts/setCurrentLifts";

export const setCurrentLiftsCreator = (payload) => ({
  type: SET_CURRENT_LIFTS,
  payload,
});


// export const setCurrentLift = ({ liftId }) => async (dispatch) => {
//   const res = await fetch(
//     `/api/lift/${liftId}`,
//     {
//       method: "GET",
//     }
//   );
//   const { data } = res.data;

//   dispatch(setCurrentLiftCreator(data));
//   return data;
// };


export const currentLifts = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SET_CURRENT_LIFTS:
            // const lifts = normalizedData(...action.payload)
            newState = { ...state, ...action.payload }
            return newState;
        default:
            return state;
    }
};


export default currentLifts;
