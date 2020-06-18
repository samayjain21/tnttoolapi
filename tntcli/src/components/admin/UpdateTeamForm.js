import React, { Component } from "react";
import { getUser } from "../../action/userAction";
import { createTeam, getTeam } from "./../../action/adminAction";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Header from "./../layout/Header";
import { Link } from "react-router-dom";

class UpdateTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      projectName: "",
      teamCode: "",
      role: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { teamCode, userCode } = this.props.match.params;
    this.props.getUser(teamCode, userCode, this.props.history);
    this.props.getTeam(teamCode, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { id, name, projectName, teamCode } = nextProps.team;
    this.setState({ id, name, projectName, teamCode });
    const { role } = nextProps.user;
    this.setState({ role });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { teamId, userCode } = this.props.match.params;
    const updatedTeam = {
      id: this.state.id,
      name: this.state.name,
      projectName: this.state.projectName,
      teamCode: this.state.teamCode,
    };
    window.confirm(
      "Are you sure you want to Update the details of this Team ?"
    ) &&
      this.props.createTeam(
        teamId,
        userCode,
        this.state.role,
        updatedTeam,
        this.props.history
      );
  }

  render() {
    const { errors } = this.state;
    const { teamId, teamCode, userCode } = this.props.match.params;
    return (
      <div className="add-user">
        <Header teamCode={teamId} userCode={userCode} />
        <Link
          to={`/adminDashboard/${teamId}/${userCode}`}
          type="button"
          className="btn btn-outline-light ml-3 mt-n3 rounded-circle"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
        <div className="add-user-form container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-body">
                <h5 className="display-5 text-center text-light">
                  Update Team
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="input-group form-group">
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.name,
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="input-group form-group text-secondary border border-white p-2 rounded">
                    <span>{this.state.teamCode}</span>
                  </div>

                  <div className="input-group form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Project Name"
                      name="projectName"
                      value={this.state.projectName}
                      onChange={this.onChange}
                    />
                  </div>
                  <input type="submit" className="btn float-right login_btn" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateTeamForm.propTypes = {
  getTeam: PropTypes.func.isRequired,
  createTeam: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.users.user,
  errors: state.errors,
  team: state.teams.team,
});
export default connect(mapStateToProps, { createTeam, getUser, getTeam })(
  UpdateTeamForm
);
