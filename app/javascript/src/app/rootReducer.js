import { combineReducers } from "redux";

import clubs from "@features/clubs/clubsSlice";
import fieldFolders from "@features/fieldFolders/fieldFoldersSlice";
import entries from "@features/entries/entriesSlice";
import clubDiary from "@features/clubDiary/clubDiarySlice";
import users from "@features/users/usersSlice";
import posters from "@features/posters/postersSlice";
import reports from "@features/reports/reportsSlice";
import { LOGOUT } from "@features/users/usersSlice";

const appReducer = combineReducers({
  clubs,
  fieldFolders,
  entries,
  clubDiary,
  users,
  posters,
  reports,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    localStorage.removeItem("token");
    localStorage.removeItem("persist:root");
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
