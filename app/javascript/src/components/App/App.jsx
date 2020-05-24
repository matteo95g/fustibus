import React from "react";
import customTheme from "../../../chakra/theme";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import HomeRoute from "@pages/Home/Route";

import Authenticated from "@pages/Layouts/Authenticated";

import { homeUrl } from "@utils/urlHelpers";

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Router>
        <Switch>
          <HomeRoute exact path={homeUrl()} layout={Authenticated} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
