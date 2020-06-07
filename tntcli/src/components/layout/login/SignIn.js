import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "./../../../action/userAction";
import { browserHistory } from "./../../../index";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(userData, browserHistory);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <li className="nav-item">
            <Link
              data-toggle="modal"
              data-target="#LoginModal"
              className="nav-link "
              to="/"
            >
              Sign In
            </Link>
          </li>
        </div>
        <div class="modal fade" id="LoginModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h5 class="modal-title  text-light" id="contactModalLabel">
                  Login Form
                </h5>
                <button type="button" class="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container ">
                  <form onSubmit={this.onSubmit}>
                    <div class="form-group ">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        aria-describedby="usernamelabel"
                        placeholder="Username"
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="form-group ">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        aria-describedby="passwordlabel"
                        placeholder="Password"
                        onChange={this.onChange}
                      />
                    </div>
                    <div class="form-group ">
                      <button className="bg-dark">Sign In</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { login })(SignIn);
