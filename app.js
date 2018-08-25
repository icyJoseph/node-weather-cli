require("dotenv").config();

const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");
const utils = require("./utils");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

const { address } = argv;

geocode.geocodeAddress(address, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    const { street, postalCode, city, country, lat, lng } = result;

    console.log(`${street}, ${postalCode} ${city}, ${country} `);

    weather.getWeather(lat, lng, (errorMessage, weatherResult) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        const isClose = utils.closeTemp(weatherResult);
        const { summary, temperature, apparentTemperature } = weatherResult;

        const firstSentence = `${summary} at ${temperature} \xB0C`;

        const secondSentence = !isClose
          ? `,but it feels like ${apparentTemperature} \xB0C.`
          : ".";

        console.log(`${firstSentence}${secondSentence}`);
      }
    });
  }
});
