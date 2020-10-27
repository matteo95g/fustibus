export const getUserFullNameOrMail = (user) => {
  if (user.names || user.last_names) {
    return `${user.names} ${user.last_names}`;
  } else {
    return user.email;
  }
};
