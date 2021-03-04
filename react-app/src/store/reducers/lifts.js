import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data";

const SET_CURRENT_LIFTS = "lifts/setCurrentLifts";

export const setCurrentLiftsCreator = (payload) => ({
  type: SET_CURRENT_LIFTS,
  payload,
});


export const setCurrentLifts = ({ bodyPartId }) => async (dispatch) => {
  const res = await fetch(
    `/api/body_parts/${bodyPartId}`,
    {
      method: "GET",
    }
  );
  const { data } = res.data;

  dispatch(setCurrentLiftsCreator(data));
  return data;
};


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
