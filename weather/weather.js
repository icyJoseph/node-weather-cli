const request = require("request");
const utils = require("../utils");

module.exports.getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.darksky.net/forecast/${
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
        const { currently, hourly, daily } = body;
        return resolve({ currently, hourly, daily });
      }
    );
  });
};

module.exports.printWeather = (
  { summary, temperature, apparentTemperature },
  time
) => {
  const { temp, appTemp, isClose } = utils.closeTemp(
    temperature,
    apparentTemperature
  );

  const firstSentence = `${summary} at ${temp} \xB0C`;

  const secondSentence = !isClose ? `\nFeels like ${appTemp} \xB0C.` : "";

  console.log(`\n${time}: \n${firstSentence}${secondSentence}`);
};
