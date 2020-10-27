export const getUserFullNameOrMail = (user) => {
  if (user.attributes.names || user.attributes.lastNames) {
    return `${user.attributes.names} ${user.attributes.lastNames}`;
  } else {
    return user.attributes.email;
  }
};
