module.exports.closeTemp = (temperature, apparentTemperature) => {
  const temp = Math.round(temperature);
  const appTemp = Math.round(apparentTemperature);
  return {
    temp,
    appTemp,
    isClose: Math.abs(temp - appTemp) < 0.3
  };
};

module.exports.errorLogger = err => {
  console.log(`There was an error: \n${err}`);
  return err;
};
