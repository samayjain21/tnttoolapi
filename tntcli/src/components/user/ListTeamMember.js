import React, { Component } from "react";
import { getUsers } from "./../../action/userAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import UserItem from "./UserItem";
import Header from "../layout/Header";

class ListTeamMember extends Component {
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getUsers(teamCode, this.props.history);
  }

  render() {
    const { users } = this.props.users;
    const { teamCode } = this.props.match.params;
    return (
      <div>
        <Header />
        <p>
          {users.map((user) => (
            <span>
              <UserItem key={user.id} user={user} />
            </span>
          ))}
        </p>
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
