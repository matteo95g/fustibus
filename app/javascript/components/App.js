import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import Hello from "@components/Hello";
import customTheme from '../chakra/theme';

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Hello title="Hello!" />} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
