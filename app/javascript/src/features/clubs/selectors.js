export const clubsState = (state) => state.clubs;

export const clubsCovers = (state) =>
  clubsState(state).all?.included?.filter(
    (included) => included.type === "covers" && included.attributes.ownerType === "Club"
  );
