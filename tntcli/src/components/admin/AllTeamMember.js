import React, { Component } from "react";
import { getUsers } from "../../action/userAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Header from "./../layout/Header";
import UserItemAdmin from "./UserItemAdmin";

class AllTeamMember extends Component {
  constructor(props) {
    const { userCode } = props.match.params;
    super(props);
    const Token = sessionStorage.getItem(userCode + "Token");
    let IsLoggedIn = true;
    console.log(" --token --- " + Token);
    if (Token === null) {
      IsLoggedIn = false;
    }
    this.state = {
      IsLoggedIn,
    };
  }
  componentDidMount() {
    const { teamCode } = this.props.match.params;
    this.props.getUsers(teamCode, this.props.history);
  }
  componentWillUnmount() {
    window.location.reload(false);
  }
  render() {
    if (this.state.IsLoggedIn === false) {
      return <Redirect to="/login" />;
    }
    const { users } = this.props.users;
    const { teamCode, userCode, teamId } = this.props.match.params;
    return (
      <div>
        <Header teamCode={teamId} userCode={userCode} />
        <Link
          to={`/adminDashboard/${teamId}/${userCode}`}
          type="button"
          className="btn btn-outline-light ml-3 mt-n3 rounded-circle"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
        <div className="d-flex justify-content-end mt-n2">
          <Link
            type="button"
            className="add-member-btn rounded  btn btn-success px-3 mt-n4 mr-5"
            to={`/addMember/${teamId}/${userCode}/${teamCode}`}
          >
            <i className="fas fa-user-plus"></i> Add Member
          </Link>
        </div>
        <p>
          {users.map((user) => (
            <span>
              <UserItemAdmin
                key={user.id}
                user={user}
                userCode={userCode}
                teamCode={teamId}
              />
            </span>
          ))}
        </p>
      </div>
    );
  }
}

AllTeamMember.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getUsers })(AllTeamMember);
