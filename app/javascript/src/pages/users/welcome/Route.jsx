import React from "react";
import { Route } from "react-router-dom";
import Page from "@pages/users/welcome";

const WelcomeRoute = ({ props }) => {
  return (
    <Route {...props}>
      <Page />
    </Route>
  );
};

export default WelcomeRoute;
