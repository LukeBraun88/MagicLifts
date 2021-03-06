import { fetch } from "../../services/fetch";
import { normalizedData } from "../../services/normalize_data";

const CREATE_STAT = "stats/createStat";

export const createStatCreator = (payload) => ({
  type: CREATE_STAT,
  payload,
});


export const createStat = ({ sets, reps, weight, date, difficulty, notes, liftId }) => async(dispatch) => {
  const res = await fetch(
    `/api/stats/${id}`,
    {
      method: "POST",
      body: JSON.stringify({
        sets: sets,
        reps: reps,
        weight: weight,
        date: date,
        difficulty:difficulty,
        notes: notes,
        lift_id: liftId
      }),
    }
  );

  let {data} = res.data;

  dispatch(setShownLiftsCreator(data))
  return data
}
