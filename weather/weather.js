const request = require("request");

module.exports.getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.sdarksky.net/forecast/${
      process.env.WEATHER_KEY
    }/${lat},${lng}?units=si`;

    request(
      {
        url,
        json: true
      },
      (error, res, body) => {
        if (error) {
          const message = "Could not connect to the Forecast API.";
          return reject(message);
        }
        if (res.statusCode !== 200) {
          return reject(`HTTP request error ${res.statusCode}`);
        }
        if (body.error) {
          return reject(body.error);
        }
        return resolve(body.currently);
      }
    );
  });
};
