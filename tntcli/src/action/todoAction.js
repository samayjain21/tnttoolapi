import axios from "axios";
import { GET_TODOTASKS, GET_ERRORS, GET_TODO, DELETE_TODO } from "./type";

export const createTodo = (
  teamCode,
  assignUserId,
  userCode,
  todo,
  history
) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:8081/api/todo/${teamCode}/${assignUserId}/`,
      todo
    );
    history.push(`/teamLeadDashboard/${teamCode}/${userCode}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
export const getTodos = (team_id, history) => async (dispatch) => {
  const res = await axios.get(`http://localhost:8081/api/todo/${team_id}`);
  console.log("response in react", res);
  dispatch({
    type: GET_TODOTASKS,
    payload: res.data,
  });
};

export const getTodo = (team_id, user_id, todo_id, history) => async (
  dispatch
) => {
  const res = await axios.get(
    `http://localhost:8081/api/todo/${team_id}/${user_id}/${todo_id}`
  );

  console.log("response in react", res);
  dispatch({
    type: GET_TODO,
    payload: res.data,
  });
};

export const deleteTodo = (userCode, taskId) => async (dispatch) => {
  await axios.delete(`http://localhost:8081/api/todo/${userCode}/${taskId}`);
  dispatch({
    type: DELETE_TODO,
    payload: userCode,
  });
};
