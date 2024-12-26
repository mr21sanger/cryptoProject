export const shortName = (name, n) => {
  if (name.length !== undefined && name.length >= 10) {
    return name.slice(0, n) + "....";
  } else return name;
};

export const convertDate = (date) => {
  const timestamp = date; 
  date = new Date(timestamp * 1000); 
  return date.toISOString();
};

export const formatNumber = (num) => {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1) + "T"; // Trillions
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B"; // Billions
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M"; // Millions
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K"; // Thousands
  } else {
    return num.toString(); // Less than 1,000
  }
};
