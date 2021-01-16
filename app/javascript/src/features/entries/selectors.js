export const entriesState = (state) => state.entries;
export const currentEntry = (state) => entriesState(state).current.entry;
export const entriesLoading = (state) => entriesState(state).loading;
