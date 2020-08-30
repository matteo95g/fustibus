import React, { useEffect } from "react";
import customTheme from "../../chakra/theme";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Router, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginRoute from "@pages/users/login/Route";
import SignupRoute from "@pages/users/signup/Route";
import HomeRoute from "@pages/home/Route";
import ClubsRoute from "@pages/clubs/index/Route";
import NewClubRoute from "@pages/clubs/new/Route";
import ShowClubRoute from "@pages/clubs/show/Route";
import EditClubRoute from "@pages/clubs/edit/Route";
import ShowFieldFolderRoute from "@pages/fieldFolders/show/Route";
import ProfileRoute from "@pages/users/profile/Route";
import ClubDiaryRoute from "@pages/clubDiary/show/Route";
import NewPosterRoute from "@pages/posters/new/Route";

import history from "./history";

import Authenticated from "@pages/layouts/Authenticated";
import Unauthenticated from "@pages/layouts/Unauthenticated";

import { fetchUser } from "@features/users/usersSlice";

import {
  homeUrl,
  loginUrl,
  signupUrl,
  clubsUrl,
  newClubUrl,
  clubUrl,
  editClubUrl,
  fieldFolderUrl,
  profileUrl,
  clubDiaryUrl,
  newPostersUrl,
} from "@utils/app/urlHelpers";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Router history={history}>
        <Switch>
          <LoginRoute exact path={loginUrl()} layout={Unauthenticated} />
          <SignupRoute exact path={signupUrl()} layout={Unauthenticated} />
          <HomeRoute exact path={homeUrl()} layout={Authenticated} />
          <ClubsRoute exact path={clubsUrl()} layout={Authenticated} />
          <NewClubRoute exact path={newClubUrl()} layout={Authenticated} />
          <ShowClubRoute exact path={clubUrl()} layout={Authenticated} />
          <EditClubRoute exact path={editClubUrl()} layout={Authenticated} />
          <ShowFieldFolderRoute exact path={fieldFolderUrl()} layout={Authenticated} />
          <ProfileRoute exact path={profileUrl()} layout={Authenticated} />
          <ClubDiaryRoute exact path={clubDiaryUrl()} layout={Authenticated} />
          <NewPosterRoute exact path={newPostersUrl()} layout={Authenticated} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
