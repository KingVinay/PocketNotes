const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  // Get date parts
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  // Get time parts
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format parts
  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

  return { formattedDate, formattedTime };
};

export default formatDateTime;
