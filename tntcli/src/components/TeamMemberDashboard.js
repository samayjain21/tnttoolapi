import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getUserTodos } from "./../action/todoAction";
import Header from "./layout/Header";
import { Link, Redirect } from "react-router-dom";
import TodoListMember from "./todo/TodoListMember";

class TeamMemberDashboard extends Component {
  constructor(props) {
    const { userCode } = props.match.params;

    super(props);
    const Token = sessionStorage.getItem(userCode + "Token");
    let IsLoggedIn = true;
    if (Token === null) {
      IsLoggedIn = false;
    }
    this.state = {
      search: "",
      IsLoggedIn,
    };
  }
  componentDidMount() {
    const { teamCode, userCode } = this.props.match.params;
    this.props.getUserTodos(teamCode, userCode, this.props.history);
  }
  updateSearch(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { todos } = this.props.todos;
    let filteredTodos = todos.filter((todo) => {
      return (
        todo.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div className="teamMemberDash ">
        <Header teamCode={teamCode} userCode={userCode} />
        <div className="mx-5 d-flex justify-content-end mt-n2">
          <Link
            type="button"
            className="rounded btn btn-warning px-3 ml-3"
            to={`/listPeers/${teamCode}/${userCode}`}
          >
            <i className="fas fa-users"></i> List Members
          </Link>
        </div>
        <div className="todo-list-member ml-5">
          <div id="todo-List_Member-search">
            <form action="" autocomplete="on">
              <input
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
                id="search"
                name="search"
                type="text"
                placeholder="Search..."
              />
              <input type="search" />
            </form>
          </div>
          {filteredTodos.map((todo) => (
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
