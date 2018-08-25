#!/usr/bin/env node

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
      default: "thorburnsgatan",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

const { address } = argv;

geocode
  .geocodeAddress(address)
  .then(result => {
    const { street, postalCode, city, country, lat, lng } = result;
    console.log(`${street}, ${postalCode} ${city}, ${country} `);
    // if possible return a promise to avoid nesting `then` calls
    return weather.getWeather(lat, lng);
  })
  .then(weatherResult => {
    const isClose = utils.closeTemp(weatherResult);
    const { summary, temperature, apparentTemperature } = weatherResult;

    const firstSentence = `${summary} at ${temperature} \xB0C`;

    const secondSentence = !isClose
      ? `,but it feels like ${apparentTemperature} \xB0C.`
      : ".";

    console.log(`${firstSentence}${secondSentence}`);
  })
  .catch(utils.errorLogger);
