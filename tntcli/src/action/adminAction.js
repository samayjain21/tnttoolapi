import axios from "axios";
import { GET_TEAMS, GET_ERRORS, DELETE_TEAM } from "./type";

export const createTeam = (systemId, adminId, team, history) => async (
  dispatch
) => {
  try {
    await axios.post(`http://localhost:8081/api/team/`, team);
    // history.push(`/adminDashboard/${systemId}/${adminId}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
export const getTeams = (history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/team/all`);
  console.log("response in react", res);
  dispatch({
    type: GET_TEAMS,
    payload: res.data,
  });
};
export const deleteTeam = (teamCode) => async (dispatch) => {
  await axios.delete(`http://localhost:8081/api/team/${teamCode}`);
  dispatch({
    type: DELETE_TEAM,
    payload: teamCode,
  });
};
