import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data";

const SET_CURRENT_LIFTS = "lifts/setCurrentLifts";
const SET_SHOWN_LIFTS = "lifts/setShownLifts";

export const setCurrentLiftsCreator = (payload) => ({
  type: SET_CURRENT_LIFTS,
  payload,
});

export const setShownLiftsCreator = (payload) => ({
  type: SET_SHOWN_LIFTS,
  payload,
});


export const setCurrentLifts = ({ bodyPartId }) => async (dispatch) => {
  const res = await fetch(
    `/api/body_parts/${bodyPartId}`,
    {
      method: "GET",
    }
  );
  let { data } = res.data;
  data = normalizedData(data)

  dispatch(setCurrentLiftsCreator(data));
  return data;
};

export const setShownLifts = ({ liftId }) => async (dispatch) => {
  const res = await fetch(
    `/api/lifts/${liftId}`,
    {
      method: "GET",
    }
  );
  let { data } = res.data;

  data = normalizedData(data)

  dispatch(setShownLiftsCreator(data));
  return data;
};


export const currentLifts = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SET_CURRENT_LIFTS:
            // const lifts = normalizedData(...action.payload)
            newState = { ...action.payload }
            return newState;
        default:
            return state;
    }
};

export const shownLifts = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SET_SHOWN_LIFTS:
            // const lifts = normalizedData(...action.payload)
            newState = { ...action.payload }
            return newState;
        default:
            return state;
    }
};
