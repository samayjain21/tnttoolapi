import React, { Component } from "react";
import { Link } from "react-router-dom";
import ViewTodoDetails from "./ViewTodoDetails";

class TodoList extends Component {
  render() {
    const { todo } = this.props;
    return (
      <div class="todo-list-content card text-white mb-3">
        <div class="card-header ">
          TODO :<span>{todo.name}</span>
        </div>
        <div class="card-body">
          <p>
            Status :<span>{todo.status}</span>
          </p>
          <p class="card-title font-italic">Assigned To : {todo.assignedTo}</p>
          <p class="card-title font-italic">Due Date and Time : </p>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <ViewTodoDetails todo={todo} />
        </div>
      </div>
    );
  }
}
export default TodoList;
