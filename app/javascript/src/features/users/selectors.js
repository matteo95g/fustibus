export const usersState = (state) => state.users;

export const currentUser = (state) => usersState(state).current?.user;

export const currentUserImage = (state) => usersState(state).current?.included?.find((included) => included.type === "images");

export const currentUserClub = (state) => {
  const currentClub = usersState(state).current.included?.find((included) => included.type === "clubs");

  if (!currentClub) return null;

  const coverId = currentClub.relationships.cover?.data?.id;
  const cover = usersState(state).current.included?.find((included) => included.type === "covers" && included.id === coverId);

  return { ...currentClub.attributes, id: currentClub.id, cover: cover?.attributes?.file };
};

export const currentUserClubRoles = (state) => {
  const currentClubRoles = usersState(state).current.included?.filter((included) => included.type === "roles");

  if (!currentClubRoles) return null;

  return currentClubRoles.map((role) => role.attributes.name);
};
