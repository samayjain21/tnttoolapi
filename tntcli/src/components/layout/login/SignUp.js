import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createTeam } from "./../../../action/adminAction";
import { createUserViaAdmin } from "./../../../action/userAction";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: "",
      teamId: "A01",
      name: "Admin",
      projectName: "Adminstration",
      username: "admin",
      password: "admin",
      role: "3",
      teamCode: "",
      errors: {},
    };
  }

  onRegisterClick = () => {
    const newTeam = {
      name: this.state.name,
      projectName: this.state.projectName,
      teamCode: this.state.teamId,
    };

    this.props.createTeam(
      this.state.teamId,
      this.state.userCode,
      0,
      newTeam,
      this.props.history
    );
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount() {
    const adminUser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
    };

    this.props.createUserViaAdmin(
      this.state.teamId,
      this.state.userCode,
      adminUser,
      this.state.teamId,
      this.props.history
    );
  }
  render() {
    return (
      <div>
        <li className="nav-item">
          <Link
            className="nav-link text-light "
            to="/login"
            onClick={this.onRegisterClick.bind()}
          >
            Register Project
          </Link>
        </li>
      </div>
    );
  }
}

SignUp.propTypes = {
  createTeam: PropTypes.func.isRequired,
  createUserViaAdmin: PropTypes.func.isRequired,
};
export default connect(null, {
  createTeam,
  createUserViaAdmin,
})(SignUp);
