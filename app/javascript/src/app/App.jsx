import React from "react";
import customTheme from "../../chakra/theme";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import HomeRoute from "@pages/home/Route";
import ClubsRoute from "@pages/clubs/index/Route";
import NewClubRoute from "@pages/clubs/new/Route";
import ShowClubRoute from "@pages/clubs/show/Route";
import ShowFieldFolderRoute from "@pages/fieldFolders/show/Route";

import Authenticated from "@pages/layouts/Authenticated";

import { homeUrl, clubsUrl, newClubUrl, clubUrl, fieldFolderUrl } from "@utils/app/urlHelpers";

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Router>
        <Switch>
          <HomeRoute exact path={homeUrl()} layout={Authenticated} />
          <ClubsRoute exact path={clubsUrl()} layout={Authenticated} />
          <NewClubRoute exact path={newClubUrl()} layout={Authenticated} />
          <ShowClubRoute exact path={clubUrl()} layout={Authenticated} />
          <ShowFieldFolderRoute exact path={fieldFolderUrl()} layout={Authenticated} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
