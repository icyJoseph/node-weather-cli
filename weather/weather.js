const axios = require("axios");

module.exports.getWeather = (lat, lng) => {
  const url = `https://api.darksky.net/forecast/${
    process.env.WEATHER_KEY
  }/${lat},${lng}?units=si`;

  return axios.get(url).then(res => {
    return res.data.currently;
  });
};
