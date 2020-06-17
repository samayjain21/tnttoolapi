import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../../action/userAction";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
class UserItem extends Component {
  onDeleteClick = (teamCode, userCode) => {
    window.confirm("Are you sure you want to remove this member?") &&
      this.props.deleteUser(teamCode, userCode);
  };
  render() {
    const { user } = this.props;
    const { userCode } = this.props;
    return (
      <div className="container list-team-member">
        <div className="card card-body  list-member mb-3 p-3">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-10 pl-4 list-team-detail">
              <h3>
                <span>
                  {user.name}
                  <span className="font-italic h6"> ({user.username})</span>
                </span>
              </h3>
              <small>
                User Id : <span>{user.userCode}</span>
              </small>
            </div>
            <div className="col-lg-4 col-md-6 col-2 d-flex justify-content-end mt-n2 mb-3">
              <Link
                type="button"
                className="rounded btn btn-warning px-3 py-2 mt-3 mr-2"
                to={`/updateTeamMember/${user.teamCode}/${userCode}/${user.userCode}`}
              >
                <i className="fa fa-edit"></i>
              </Link>

              {(() => {
                switch (user.role) {
                  case 1:
                    return (
                      <div
                        onClick={this.onDeleteClick.bind(
                          this,
                          user.teamCode,
                          user.userCode
                        )}
                        type="button"
                        className="rounded btn btn-danger px-3 py-2  ml-2 mt-3 mr-2"
                      >
                        <i className="fa fa-trash"></i>
                      </div>
                    );

                  default:
                    return "";
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UserItem.propTypes = {
  deleteUser: PropTypes.func.isRequired,
};
export default connect(null, { deleteUser })(UserItem);
