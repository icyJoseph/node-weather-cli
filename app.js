const request = require("request");
const yargs = require("yargs");

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

const encodedAddress = encodeURIComponent(address);

const url = `http://www.mapquestapi.com/geocoding/v1/address?key=vPCL8AwvoLGubJ93BHIGbvg9b9XP00KR&location=${encodedAddress}`;

request(
  {
    url,
    json: true
  },
  (error, res, body) => {
    // console.log(body.results[0].locations);
    const [
      { street, postalCode, adminArea5, adminArea1, latLng }
    ] = body.results[0].locations;
    console.log(
      ` Street: ${street} Zip Code: ${postalCode} - ${adminArea5}, ${adminArea1}`
    );
    console.log(latLng);
  }
);
