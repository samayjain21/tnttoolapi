import React, { Component } from "react";
import HeaderLandingPage from "./layout/HeaderLandingPage";
import FooterLandingPage from "./layout/FooterLandingPage";

class LandingPage extends Component {
  componentDidMount() {
    sessionStorage.clear();
  }
  render() {
    return (
      <div className="landing-page">
        <div>
          <HeaderLandingPage />
        </div>
        <div className="container">
          <div className="landing-page-content ">
            <p className="landing-page-text font-italic text-dark">
              This application is for internal team management and it support
              multilevel hierarchy such as Project Admin, Team Lead and Team
              Member. The project admin can control all the employees and team
              in the project, he can add teams and assign respective team lead
              and members to the team. The Team lead can add new Todo and assign
              this todo to its respective team members. He can also add or
              remove team members. Team Lead can see all the Todos and its
              details of corresponding to his team. A team member will be able
              to see only those todo which are assign to him. He can update the
              status of todo and can add comments. This application is not only
              for project management but it can be used for day to day
              status/work also.
            </p>
          </div>
        </div>
        <div>
          <FooterLandingPage />
        </div>
      </div>
    );
  }
}
export default LandingPage;
