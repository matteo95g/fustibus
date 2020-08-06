import React from "react";
import { Route } from "react-router-dom";
import Page from "@pages/users/signup";

const SignupRoute = ({ layout: Layout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Page {...props} />
        </Layout>
      )}
    />
  );
};

export default SignupRoute;
