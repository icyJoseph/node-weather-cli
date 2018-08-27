# weather-cli

Simple node weather-cli to fetch the weather forecast for a given location.

## How to use Globally

1. Get your API keys.

   The geolocation API key can be obtained by signing up to: [Map Quest](https://developer.mapquest.com/).

   The weather forecast API key can be obtained by signing up to: [Forecast IO](https://darksky.net/dev).

2. Add `GEOLOCATION_KEY` and `WEATHER_KEY` to your system environment variables.

3. From the root folder, run the following to install globally.

   ```
   npm i -g
   ```

4. Run the CLI.

   ```
   weather -a="your address"
   ```

## How to use from the project folder only

1. In the root, create an `.env` file:

   ```
   touch .env
   ```

2. Add `GEOLOCATION_KEY` and `WEATHER_KEY` values:

   ```
   GEOLOCATION_KEY=YOUR_KEY
   WEATHER_KEY=THE_OTHER_KEY
   ```

3. Install deps:

   ```
   npm i
   ```

4. Run:

   ```
   node app.js -a="your address"
   ```

## Default Address

You can also set a default address value by modifying the `yargs` config object in `./app.js`.

```js
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      default: "your default address", // <- HERE
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;
```
