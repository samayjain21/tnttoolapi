import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../../action/userAction";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { message } from "antd";

class UserItem extends Component {
  onDeleteClick = (teamCode, userCode) => {
    window.confirm("Are you sure you want to remove this member?") &&
      this.props.deleteUser(teamCode, userCode) &&
      this.openMessage();
  };
  openMessage = () => {
    const { user } = this.props;
    const key = "updatable";
    setTimeout(() => {
      message.success({
        content: "  Member ' " + user.name + " ' deleted succesfully",
        className: "custom-class",
        top: 100,
        key,
        duration: 2,
      });
    }, 1000);
  };
  render() {
    const { user } = this.props;
    const { userCode } = this.props;
    return (
      <div className="container list-team-member">
        <div className="card card-body  list-member mb-3 p-3">
          <div className="row">
            <div className="col-lg-8 col-md-6 col-10 pl-4 list-team-detail">
              <h4>
                <span>{user.name}</span>
              </h4>
              <small>
                User Id : <span>{user.userCode}</span>
              </small>{" "}
              <small className="font-italic text-light">
                ({user.username}){" "}
              </small>{" "}
              <small>
                {(() => {
                  switch (user.role) {
                    case 2:
                      return (
                        <span>
                          -{" "}
                          <span className="text-danger">
                            <u>Team Lead</u>
                          </span>
                        </span>
                      );

                    default:
                      return;
                  }
                })()}
              </small>
            </div>

            {(() => {
              switch (user.role) {
                case 1:
                  return (
                    <div className="col-lg-4 col-md-6 col-2 d-flex justify-content-end mt-n2 mb-3">
                      <Link
                        type="button"
                        data-toggle="tooltip"
                        title="Edit Team Member"
                        className="rounded btn btn-warning px-3 py-2 mt-3 mr-2"
                        to={`/updateTeamMember/${user.teamCode}/${userCode}/${user.userCode}`}
                      >
                        <i className="fas fa-user-edit"></i>
                      </Link>
                      <div
                        data-toggle="tooltip"
                        title="Delete Team Member"
                        onClick={this.onDeleteClick.bind(
                          this,
                          user.teamCode,
                          user.userCode
                        )}
                        type="button"
                        className="rounded btn btn-danger px-3 py-2  ml-2 mt-3 mr-2 "
                      >
                        <i className="fas fa-trash-alt"></i>
                      </div>
                    </div>
                  );

                default:
                  return "";
              }
            })()}
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
