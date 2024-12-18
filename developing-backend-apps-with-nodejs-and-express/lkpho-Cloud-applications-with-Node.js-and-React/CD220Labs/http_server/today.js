// Export a function named 'getDate' from the module
module.exports.getDate = function getDate() {
  // Get the current date and time in the timezone "Australia/Brisbane"
  let aestTime = new Date().toLocaleString('en-US', {
    timeZone: 'Australia/Brisbane',
  });
  let hours = new Date().toLocaleString('en-US', {
    timeZone: 'Australia/Brisbane',
    hour: 'numeric',
    hour12: false,
  });
  return [aestTime, hours]; // Return the formatted date and time
};
