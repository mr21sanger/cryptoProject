export const shortName = (name) => {
  if (name.length !== undefined && name.length >= 10) {
    return name.slice(0, 10) + "....";
  } else return name;
};

