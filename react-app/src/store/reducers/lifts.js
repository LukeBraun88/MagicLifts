import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data";

const SET_CURRENT_LIFTS = "lifts/setCurrentLifts";
const SET_SHOWN_LIFTS = "lifts/setShownLifts";
const DELETE_SHOWN_LIFTS = "lifts/deleteShownLifts";
// const CREATE_STAT = "stats/createStat";

export const setCurrentLiftsCreator = (payload) => ({
  type: SET_CURRENT_LIFTS,
  payload,
});

export const setShownLiftsCreator = (payload) => ({
  type: SET_SHOWN_LIFTS,
  payload,
});

export const deleteShownLiftsCreator = (payload) => ({
  type: DELETE_SHOWN_LIFTS,
  payload,
});

// export const createStatCreator = (payload) => ({
//   type: CREATE_STAT,
//   payload,
// });

// export const updateShownLiftsCreator = (payload) => ({
//   type: UPDATE_SHOWN_LIFTS,
//   payload,
// });


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

  dispatch(setShownLiftsCreator(data));
  return data;
};

export const createLift = ({ title, description, bodyPart }) => async (dispatch) => {
  console.log("bodyPart:", bodyPart)
  const res = await fetch(
    `/api/lifts`,
    {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        body_part: bodyPart,
      }),
    }
  );
  let { data } = res.data;

  dispatch(setShownLiftsCreator(data));
  return data;
};

export const deleteLift = ({ liftId }) => async (dispatch) => {
  console.log("deleting lift:", liftId)
  const res = await fetch(
    `/api/lifts/${liftId}`,
    {
      method: "DELETE"
    }
  );
  let { data } = res.data;
    console.log("deleted----heres id:", data)
  dispatch(deleteShownLiftsCreator(data));
  return data;
};


export const updateShownStats = ({ id, sets, reps, weight, date, difficulty, notes }) => async(dispatch) => {
  const res = await fetch(
    `/api/stats/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        sets: sets,
        reps: reps,
        weight: weight,
        date: date,
        difficulty:difficulty,
        notes: notes,
      }),
    }
  );

  let {data} = res.data;

  dispatch(setShownLiftsCreator(data))
  return data
}

export const createStat = ({ sets, reps, weight, date, difficulty, notes, liftId }) => async (dispatch) => {
  const res = await fetch(
    `/api/stats`,
    {
      method: "POST",
      body: JSON.stringify({
        sets: sets,
        reps: reps,
        weight: weight,
        date: date,
        difficulty: difficulty,
        notes: notes,
        lift_id: liftId
      }),
    }
  );

  let { data } = res.data;

  dispatch(setShownLiftsCreator(data))
  return data
}



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

// export const shownLifts = (state = {}, action) => {
export const shownLifts = (state = {lift:null, stats:null}, action) => {
    let newState;
    switch (action.type) {
        case SET_SHOWN_LIFTS:
            // const lifts = normalizedData(...action.payload)
            newState = { lift:action.payload, stats:action.payload.stats }
            return newState;
        // case UPDATE_SHOWN_LIFTS:
        //     const lifts = normalizedData(...action.payload)

        //     newState = { lift: action.payload, stats}

        //     return newState;
        case DELETE_SHOWN_LIFTS:
            newState = { lift: "deleted", stats: null }
            return newState;

        default:
            return state;
    }
};
