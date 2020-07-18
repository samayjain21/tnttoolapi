import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "./../../action/userAction";

var memberCount = 0;
class TeamMemberCount extends Component {
  componentDidMount() {
    const { teamCode } = this.props;
    this.props.getUsers(teamCode, this.props.history);
  }
  componentWillUnmount() {
    memberCount = 0;
  }
  render() {
    const { users } = this.props.users;
    return (
      <div>
        <p>
          {users.map((user) => (
            <span>
              {
                (memberCount++,
                console.log("memberCount = == = = =  =-" + memberCount))
              }
            </span>
          ))}
        </p>
        {memberCount}
      </div>
    );
  }
}
TeamMemberCount.propTypes = {
  getUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getUsers })(TeamMemberCount);
