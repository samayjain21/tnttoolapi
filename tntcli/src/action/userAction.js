import axios from "axios";
import { GET_ERRORS, USER_LOGIN } from "./type";
import { hashHistory } from "react-router";
import { browserHistory } from "./../index";
export const login = (user, history) => async (dispatch) => {
  try {
    console.log("==>>", user);
    const res = await axios.post("http://localhost:8081/api/user/login", user);
    console.log("response in react", res);
    //   history.push("/userDashboard");
    // hashHistory.push("/userDashboard");
    browserHistory.push("/userDashboard");
    dispatch({
      type: USER_LOGIN,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
