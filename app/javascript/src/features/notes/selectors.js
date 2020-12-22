export const notesState = (state) => state.notes;

export const currentNotesSections = (state) => notesState(state).current.included.filter((inc) => inc.type === "note_sections");
