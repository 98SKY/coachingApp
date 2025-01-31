export const formatDate = (isoDate) => {
    if (!isoDate) return "DD/MM/YYYY"; // Handle null/undefined case
  
    const date = new Date(isoDate);
  
    // Get the day with suffix
    const day = date.getDate();
    const dayWithSuffix =
      day + (["th", "st", "nd", "rd"][(day % 10 > 3 || [11, 12, 13].includes(day % 100)) ? 0 : day % 10]);
  
    // Get the month name and year
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
  
    return `${dayWithSuffix} of ${month} ${year}`;
  };
  