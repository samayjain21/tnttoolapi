import {
  GET_TODOTASKS,
  GET_TODO,
  DELETE_TODO,
  GET_USERTODOTASKS,
} from "./../action/type";

const initialState = {
  todos: [],
  todo: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOTASKS:
      return {
        ...state,
        todos: action.payload,
      };
    case GET_USERTODOTASKS:
      return {
        ...state,
        todos: action.payload,
      };
    case GET_TODO:
      return {
        ...state,
        todo: action.payload,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.taskIdentifier != action.payload
        ),
      };
    default:
      return state;
  }
}
