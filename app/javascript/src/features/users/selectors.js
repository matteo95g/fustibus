export const usersState = (state) => state.users;

export const currentUser = (state) => usersState(state).current?.user;

export const currentUserImage = (state) =>
  usersState(state).current?.included?.find((included) => included.type === "images");

export const currentUserClub = (state) => {
  const currentClubRelation = currentUser(state)?.relationships?.currentClub?.data;

  if (!currentClubRelation) return null;

  const currentClub = usersState(state)?.current?.included?.find(
    (included) =>
      included.type === currentClubRelation.type && included.id == currentClubRelation.id
  );

  const coverId = currentClub.relationships.cover?.data?.id;
  const cover = usersState(state).current.included?.find(
    (included) => included.type === "covers" && included.id === coverId
  );

  return { ...currentClub.attributes, id: currentClub.id, cover: cover?.attributes?.file };
};

export const currentUserClubRoles = (state) => {
  const currentClubRoles = usersState(state).current.included?.filter(
    (included) => included.type === "roles"
  );

  if (!currentClubRoles) return null;

  return currentClubRoles.map((role) => role.attributes.name);
};

export const currentUserInvitations = (state) => {
  let invitations = usersState(state).current.included?.filter(
    (included) => included.type === "invitations"
  );

  invitations = invitations.map((invitation) => {
    const invitationClubRelation = invitation.relationships.club.data;

    const club = usersState(state).current.included?.find(
      (included) =>
        included.type === invitationClubRelation.type && included.id == invitationClubRelation.id
    );

    return { ...invitation, club };
  });

  return invitations;
};
