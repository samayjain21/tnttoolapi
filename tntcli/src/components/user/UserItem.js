import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserItem extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{user.name}</h3>
              <p>description</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <Link
                type="button"
                className="rounded-pill btn btn-warning px-5 m-1"
                to={`/UpdateTeamMember/${user.teamCode}/${user.userCode}`}
              >
                Update
                <br />
              </Link>

              <Link
                type="button"
                className="rounded-pill btn btn-danger px-5 m-1"
                to={`/RemoveTeamMember/${user.teamCode}/${user.userCode}`}
              >
                Remove
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserItem;
