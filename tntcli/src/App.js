import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { Provider } from "react-redux";
import store from "./store";
import TeamLeadDashboard from "./components/TeamLeadDashboard";
import LoginForm from "./components/layout/login/forms/LoginForm";
import TeamMemberDashboard from "./components/TeamMemberDashboard";
import RegistrationForm from "./components/layout/login/forms/RegistrationForm";
import ListTeamMember from "./components/user/ListTeamMember";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginForm} />
        <Route
          exact
          path="/teamLeadDashboard/:teamCode/:userCode"
          component={TeamLeadDashboard}
        />
        <Route
          exact
          path="/teamMemberDashboard/:teamCode/:userCode"
          component={TeamMemberDashboard}
        />
        <Route exact path="/registrationForm" component={RegistrationForm} />
        <Route exact path="/teamMember/:teamCode" component={ListTeamMember} />
      </Router>
    </Provider>
  );
}

export default App;
