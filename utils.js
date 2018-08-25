module.exports.closeTemp = ({ temperature, apparentTemperature }) => {
  return Math.abs(temperature - apparentTemperature) < 0.3;
};

module.exports.errorLogger = err => {
  console.log(`There was an error: \n${err}`);
  return err;
};
