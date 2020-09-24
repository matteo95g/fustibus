export const fieldFoldersState = (state) => state.fieldFolders;

export const currentFieldFolderEntries = (state) =>
  fieldFoldersState(state).current?.included?.filter((included) => included.type === "entries");

export const currentFieldFolder = (state) => fieldFoldersState(state).current.fieldFolder;
