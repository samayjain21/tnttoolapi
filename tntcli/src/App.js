import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignIn from "./components/layout/login/SignIn";
import { Provider } from "react-redux";
import store from "./store";
import UserDashboard from "./components/UserDashboard";
import { browserHistory } from "react-router";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/userDashboard" component={UserDashboard} />
      </Router>
    </Provider>
  );
}

export default App;
