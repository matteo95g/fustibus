export const homeUrl = () => "/";

export const loginUrl = () => "/login";
export const signupUrl = () => "/signup";

export const clubsUrl = () => "/clubs";
export const newClubUrl = () => "/clubs/new";
export const clubUrl = (id) => (id ? `/clubs/${id}` : "/clubs/:id");
export const editClubUrl = (id) => (id ? `/clubs/${id}/edit` : "/clubs/:id/edit");

export const fieldFolderUrl = (id) => (id ? `/field-folders/${id}` : "/field-folders/:id");

export const profileUrl = () => "/profile";
export const clubDiaryUrl = (id) => (id ? `/clubs/${id}/diary` : "/clubs/:id/diary");

export const newPostersUrl = () => "/posters/new";
