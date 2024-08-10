export const handleError = (error) => {
  if (error.response) {
    console.error("Error response:", error.response.data);
  } else if (error.request) {
    console.error("Error request:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
};
