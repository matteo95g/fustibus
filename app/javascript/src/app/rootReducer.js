import { combineReducers } from "redux";

import clubs from "@features/clubs/clubsSlice";
import fieldFolders from "@features/fieldFolders/fieldFoldersSlice";
import entries from "@features/entries/entriesSlice";
import clubDiary from "@features/clubDiary/clubDiarySlice";
import users from "@features/users/usersSlice";
import posters from "@features/posters/postersSlice";

export default combineReducers({
  clubs,
  fieldFolders,
  entries,
  clubDiary,
  users,
  posters,
});
