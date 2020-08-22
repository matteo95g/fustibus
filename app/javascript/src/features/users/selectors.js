export const currentUser = (state) => state.users.current.user?.attributes;

export const currentUserClub = (state) => {
  const currentClub = state.users.current.included?.find(
    (included) => included.type === "clubs"
  );

  if (!currentClub) return null;

  const coverId = currentClub.relationships.cover?.data?.id;
  const cover = state.users.current.included?.find(
    (included) => included.type === "covers" && included.id === coverId
  );

  return { ...currentClub.attributes, cover: cover?.attributes?.file }
}

export const currentUserClubRoles = (state) => {
  const currentClubRoles = state.users.current.included?.filter(
    (included) => included.type === "roles"
  );

  if (!currentClubRoles) return null;

  return currentClubRoles.map((role) => role.attributes.name);
}
