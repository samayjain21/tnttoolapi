import React, { Component } from "react";
import { getUsers } from "./../../action/userAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import UserItem from "./UserItem";
import Header from "../layout/Header";
import BackToDashboardButton from "./BackToDashBoardButton";
import { Link } from "react-router-dom";

class ListTeamMember extends Component {
  componentDidMount() {
    const { teamCode, userCode } = this.props.match.params;
    this.props.getUsers(teamCode, this.props.history);
  }

  render() {
    const { users } = this.props.users;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div>
        <Header />
        <BackToDashboardButton teamCode={teamCode} userCode={userCode} />
        <Link
          type="button"
          className="add-member-btn rounded-pill btn btn-success px-4"
          to={`/addTeamMember/${teamCode}/${userCode}`}
        >
          <i className="fa fa-plus" aria-hidden="true"></i> Add Member
        </Link>
        <div>
          {users.map((user) => (
            <span>
              <UserItem key={user.id} user={user} userCode={userCode} />
            </span>
          ))}
        </div>
      </div>
    );
  }
}

ListTeamMember.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getUsers })(ListTeamMember);
// export default ListTeamMember;
