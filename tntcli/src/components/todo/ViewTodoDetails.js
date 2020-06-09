import React, { Component } from "react";
import { Link } from "react-router-dom";

class ViewTodoDetails extends Component {
  render() {
    const { todo } = this.props;
    const todoName = todo.name;
    console.log(
      "name -" +
        todoName +
        "  Teamcode -" +
        todo.teamCode +
        "  usercode -" +
        todo.userCode +
        "  TaskCode -" +
        todo.taskIdentifier
    );

    return (
      <div>
        <Link
          to={`/edit/todo/${todo.teamCode}/${todo.userCode}/${todo.taskIdentifier}`}
          class="card-link btn btn-success btn-sm mx-1"
        >
          <i class="fa fa-edit"></i>
        </Link>
        <Link to="#" class="card-link btn btn-danger btn-sm mx-1">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </Link>
        <button
          type="button"
          class="btn btn-primary btn-sm mx-1"
          data-toggle="modal"
          data-target="#viewTodo"
        >
          <i class="fa fa-eye" aria-hidden="true"></i>
        </button>
        <div
          class="modal fade"
          id="viewTodo"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-light" id="exampleModalLongTitle">
                  Todo Name : <span>{todoName}</span>
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p class="text-light">
                  Detials: <br />
                  {todo.detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewTodoDetails;
