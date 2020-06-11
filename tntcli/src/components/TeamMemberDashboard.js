import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getUserTodos } from "./../action/todoAction";
import Header from "./layout/Header";
import { Link } from "react-router-dom";
import TodoListMember from "./todo/TodoListMember";

class TeamMemberDashboard extends Component {
  componentDidMount() {
    const { teamCode, userCode } = this.props.match.params;
    this.props.getUserTodos(teamCode, userCode, this.props.history);
  }

  render() {
    const { todos } = this.props.todos;
    const { teamCode, userCode } = this.props.match.params;

    return (
      <div className="teamMemberDash ">
        <Header teamCode={teamCode} userCode={userCode} />
        <Link
          type="button"
          className="rounded-pill btn btn-warning px-5 ml-5"
          to={`/listPeers/${teamCode}/${userCode}`}
        >
          <i className="fa fa-list" aria-hidden="true"></i> List Team Members
        </Link>
        <div className="todo-list-member ml-5 mt-5">
          {todos.map((todo) => (
            <TodoListMember key={todo.id} todo={todo} userCode={userCode} />
          ))}
        </div>
      </div>
    );
  }
}

TeamMemberDashboard.propTypes = {
  todo: PropTypes.object.isRequired,
  getUserTodos: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  todos: state.todos,
});
export default connect(mapStateToProps, { getUserTodos })(TeamMemberDashboard);
