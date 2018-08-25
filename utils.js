module.exports.closeTemp = ({ temperature, apparentTemperature }) => {
  return Math.abs(temperature - apparentTemperature) < 0.3;
};
