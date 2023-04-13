const host =
  process.env.REACT_APP_USE_CYCLIC_API === "1"
    ? process.env.REACT_APP_HOST
    : "http://localhost:5000";

export default host;
