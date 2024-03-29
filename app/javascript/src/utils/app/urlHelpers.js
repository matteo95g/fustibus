export const homeUrl = () => "/";

export const loginUrl = () => "/login";
export const signupUrl = () => "/signup";

export const welcomeUrl = () => "/welcome";

export const clubsUrl = () => "/clubs";
export const newClubUrl = () => "/clubs/new";
export const clubUrl = (id) => (id ? `/clubs/${id}` : "/clubs/:id");
export const editClubUrl = (id) => (id ? `/clubs/${id}/edit` : "/clubs/:id/edit");

export const fieldFolderUrl = () => "/field-folder";
export const newEntryUrl = () => "/entries/new";
export const editEntryUrl = (id) => (id ? `/entries/${id}/edit` : "/entries/:id/edit");

export const profileUrl = () => "/profile";
export const clubDiaryUrl = () => "/diary";

export const notebookUrl = () => "/notebook";

export const newNoteUrl = () => "/notes/new";
export const editNoteUrl = (id) => (id ? `/notes/${id}/edit` : "/notes/:id/edit");

export const newPosterUrl = () => "/poster";
export const postersUrl = () => "/posters";

export const reportsUrl = () => "/reports";
