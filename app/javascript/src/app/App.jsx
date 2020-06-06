import React from "react";
import customTheme from "../../chakra/theme";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import HomeRoute from "@pages/home/Route";
import ClubsRoute from "@pages/clubs/Route";

import Authenticated from "@pages/layouts/Authenticated";

import { homeUrl, clubsUrl } from "@utils/app/urlHelpers";

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Router>
        <Switch>
          <HomeRoute exact path={homeUrl()} layout={Authenticated} />
          <ClubsRoute exact path={clubsUrl()} layout={Authenticated} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;