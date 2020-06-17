import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteTeam } from "./../../action/adminAction";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class TeamList extends Component {
  onDeleteClick = (teamId) => {
    window.confirm("Are you sure you want to delete the Team?") &&
      this.props.deleteTeam(teamId);
  };

  render() {
    const { team } = this.props;
    const { teamCode, userCode } = this.props;
    return (
      <div className="team-list-content card ml-3 mb-3">
        <div className="card-body">
          <p className="mr-5">
            Team : <span>{team.name}</span>
          </p>

          <p>
            Project Name : <span>{team.projectName}</span>
          </p>
          <p className="card-title  ">
            Team Code : <span>{team.teamCode}</span>
          </p>
          <p className="card-title ">
            Team Lead : <span>{team.teamLead}</span>
          </p>
        </div>
        <span className="surface"></span>

        <Link to={`/listTeamMember/${teamCode}/${userCode}/${team.teamCode}`}>
          <i className="fa fa-list icons"></i>
        </Link>

        <Link to={`/updateTeamForm/${teamCode}/${userCode}/${team.teamCode}`}>
          <i className="fa fa-edit icons"></i>
        </Link>

        <div onClick={this.onDeleteClick.bind(this, team.teamCode)}>
          <i className="fa fa-trash icons"></i>
        </div>
      </div>
    );
  }
}

TeamList.propTypes = {
  deleteTeam: PropTypes.func.isRequired,
};
export default connect(null, { deleteTeam })(TeamList);
