import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Hello from "@components/Hello";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Hello />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
