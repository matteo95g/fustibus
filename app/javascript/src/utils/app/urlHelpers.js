export const homeUrl = () => "/";

export const loginUrl = () => "/login";
export const signupUrl = () => "/signup";

export const clubsUrl = () => "/clubs";
export const newClubUrl = () => "/clubs/new";
export const clubUrl = (id) => (id ? `/clubs/${id}` : "/clubs/:id");

export const fieldFolderUrl = (id) => (id ? `/clubs/${id}/field-folder` : "/clubs/:id/field-folder");
