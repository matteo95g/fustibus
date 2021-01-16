import React from "react";
import { Route } from "react-router-dom";
import Page from "@pages/entries/edit";

const EntryNewRoute = ({ layout: Layout, ...rest }) => {
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

export default EntryNewRoute;
