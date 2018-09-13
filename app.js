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
    console.log("\nThe weather in:");
    console.log(
      `${street ? `${street}, ` : ""}${
        postalCode ? `${postalCode} ` : ""
      }${city}, ${country} `
    );
    // if possible return a promise to avoid nesting `then` calls
    return weather.getWeather(lat, lng);
  })
  .then(({ currently, hourly, daily }) => {
    const nextHour = hourly.data[1];
    const tomorrow = daily.data[1];

    const {
      summary,
      apparentTemperatureHigh,
      apparentTemperatureLow,
      temperatureHigh,
      temperatureLow
    } = tomorrow;

    const tomorrowTemp = (temperatureHigh + temperatureLow) / 2;
    const tomorrowApparentTemp =
      (apparentTemperatureHigh + apparentTemperatureLow) / 2;

    weather.printWeather(currently, "Now");
    weather.printWeather(nextHour, "Next Hour");
    weather.printWeather(
      {
        ...tomorrow,
        summary: summary.replace(".", ""),
        temperature: tomorrowTemp,
        apparentTemperature: tomorrowApparentTemp
      },
      "Tomorrow"
    );
  })
  .catch(utils.errorLogger);
