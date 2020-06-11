import React, { Component } from "react";
import { getUsers } from "../../action/userAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Header from "../layout/Header";
import BackToTeamMemberDashBoard from "./BackToTeamMemberDashBoard";

class ListPeers extends Component {
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getUsers(teamCode, this.props.history);
  }

  render() {
    const { users } = this.props.users;
    const { teamCode, userCode } = this.props.match.params;
    return (
      <div>
        <Header teamCode={teamCode} userCode={userCode} />
        <BackToTeamMemberDashBoard teamCode={teamCode} userCode={userCode} />
        {users.map((user) => (
          <div className="container list-team-peer">
            <div className="card card-body list-peer ">
              <div className="row">
                <div className="text-light list-peer-detail">
                  <h3>Name : {user.name}</h3>
                  <h6>Username : {user.username}</h6>
                  <small>User Id : {user.userCode}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ListPeers.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getUsers })(ListPeers);
