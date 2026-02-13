const getTime = (time) => {
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // conversion to milliseconds
  const YEAR = 31540000000;
  const MONTH = 2628000000;
  const HOUR = 3600000;
  const MINUTES = 60000;

  const currentTime = Date.now();
  // Need to access specific methods
  const dataObject = new Date(time);
  const timeDifference = currentTime - time;

  // Check if has longer than a specific time frame and returns a format time
  if (timeDifference > YEAR) {
    const year = dataObject.getFullYear();
    const monthIndex = dataObject.getMonth();
    const month = MONTHS[monthIndex];
    const date = dataObject.getDate();
    return `${year} ${month} ${date}`;
  } else if (timeDifference > MONTH) {
    const monthIndex = dataObject.getMonth();
    const month = MONTHS[monthIndex];
    const date = dataObject.getDate();
    return `${month} ${date}`;
  } else if (timeDifference > HOUR) {
    const hours = Math.round(timeDifference / HOUR);
    return `${hours} h`;
  } else {
    const minutes = Math.round(timeDifference / MINUTES);
    return `${minutes} m`;
  }
};
export default getTime;
