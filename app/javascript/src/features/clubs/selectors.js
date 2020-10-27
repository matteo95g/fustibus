export const clubsState = (state) => state.clubs;

export const currentClub = (state) => clubsState(state).current.club;

export const clubStatus = (state) => clubsState(state).status;

export const clubsCovers = (state) =>
  clubsState(state).all?.included?.filter(
    (included) => included.type === "covers" && included.attributes.ownerType === "Club"
  );

export const currentClubCovers = (state) =>
  clubsState(state).current?.included?.filter(
    (included) => included.type === "covers" && included.attributes.ownerType === "Club"
  );

export const currentClubCurrentUserRoles = (state) =>
  clubsState(state).current?.club?.attributes?.currentUserRoles;

export const currentClubCounselorUsers = (state) =>
  clubsState(state).current?.included?.filter(
    (included) => included.type === "users" && included.attributes.isCounselor
  );

export const currentClubMembersUsers = (state) =>
  clubsState(state).current?.included?.filter(
    (included) => included.type === "users" && !included.attributes.isCounselor
  );

export const currentClubUsersImages = (state, user) =>
  clubsState(state).current?.included?.filter((included) => included.type === "images");

export const clubFieldFolder = (state) =>
  clubsState(state).all?.included?.filter((included) => included.type === "field_folders")[0];
