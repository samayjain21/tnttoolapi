import React, { Component } from "react";
import { getTodos } from "./../../action/todoAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { ProgressBar } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import Header from "../layout/Header";
import { Link } from "react-router-dom";

var todoCounter = 0;
var totalCount = 0;
var inProgressCounter = 0;
var completedCounter = 0;
class TeamProgressDashboard extends Component {
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getTodos(teamCode, this.props.history);
  }
  componentWillUnmount() {
    todoCounter = 0;
    totalCount = 0;
    inProgressCounter = 0;
    completedCounter = 0;
    window.location.reload(false);
  }

  render() {
    const { teamId, userId } = this.props.match.params;
    const { todos } = this.props.todos;
    return (
      <div className="team-progress-dashboard">
        <Header teamCode={teamId} userCode={userId} />
        <Link
          to={`/adminDashboard/${teamId}/${userId}`}
          type="button"
          className="btn btn-outline-light ml-3 mt-n3 rounded-circle"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
        <div>
          {todos.map((todo) =>
            (() => {
              totalCount++;
              switch (todo.status) {
                case "Completed":
                  completedCounter++;
                  return;
                case "TODO":
                  todoCounter++;
                  return;
                case "In-Progress":
                  inProgressCounter++;
                  return;
                default:
                  return;
              }
            })()
          )}
        </div>
        <div>
          <CircularProgressbar
            value={((completedCounter / totalCount) * 100).toFixed(2)}
            text={`${((completedCounter / totalCount) * 100).toFixed(2)}%`}
            data-toggle="tooltip"
            title={`Completed ${((completedCounter / totalCount) * 100).toFixed(
              2
            )}%`}
          />
          <div className="team-progress-bar">
            <ProgressBar
              className="border border-dark"
              variant="warning"
              now={(inProgressCounter / totalCount) * 100}
              data-toggle="tooltip"
              title={`In-Progress ${(
                (inProgressCounter / totalCount) *
                100
              ).toFixed(2)}%`}
              label={`${((inProgressCounter / totalCount) * 100).toFixed(2)}%`}
            />
            <br />
            <ProgressBar
              className="border border-dark"
              variant="danger"
              now={(todoCounter / totalCount) * 100}
              data-toggle="tooltip"
              title={`Todo ${((todoCounter / totalCount) * 100).toFixed(2)}%`}
              label={`${((todoCounter / totalCount) * 100).toFixed(2)}%`}
            />
          </div>
          <div className="card card-section ">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <div className="card card-stats border border-dark text-center bg-warning ml-4">
                    <div className="card-body">
                      <div className="card-text ">
                        <span className="h3 ">In-Progress </span>
                        <p className="h2 count border border-dark rounded">
                          {inProgressCounter}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card card-stats border border-dark text-center bg-danger mr-4">
                    <div className="card-body">
                      <div className="card-text">
                        <span className="h3">Todo </span>{" "}
                        <p className="h2 count border border-dark rounded">
                          {" "}
                          {todoCounter}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card total-todo-card border border-dark w-100 text-center bg-primary ">
                  <div className="card-body">
                    <div className="card-text">
                      <span className="h3">Total Todo's </span>
                      <p className="h2 count border border-dark rounded">
                        {" "}
                        {totalCount}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card completed-card">
          <div className="card-body">
            <div className="card card-stats border border-dark text-center bg-success mx-3">
              <div className="card-body">
                <div className="card-text">
                  <span className="h3">Completed </span>{" "}
                  <p className="h2 count border border-dark rounded">
                    {" "}
                    {completedCounter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TeamProgressDashboard.propTypes = {
  getTodos: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps, { getTodos })(TeamProgressDashboard);
