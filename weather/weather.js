const request = require("request");

module.exports.getWeather = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}?units=si`;

  request(
    {
      url,
      json: true
    },
    (error, res, body) => {
      if (error) {
        const message = "Could not connect to the Forecast API.";
        return callback(message);
      }
      if (res.statusCode !== 200) {
        return callback(`HTTP request error ${res.statusCode}`);
      }
      if (body.error) {
        return callback(body.error);
      }
      return callback(null, body.currently);
    }
  );
};
