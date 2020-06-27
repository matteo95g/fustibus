export const getAreaColor = (area) => {
  switch (area) {
    case "science":
      return "blue";
    case "technology":
      return "red";
    case "social":
      return "green";
  }
};

export const translateArea = (area) => {
  switch (area) {
    case "science":
      return "Ciencia";
    case "technology":
      return "Tecnología";
    case "social":
      return "Social";
    default:
      return area;
  }
};
