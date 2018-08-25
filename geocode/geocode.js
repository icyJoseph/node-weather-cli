const request = require("request");

module.exports.geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${
    process.env.GEOLOCATION_KEY
  }&location=${encodedAddress}`;

  request(
    {
      url,
      json: true
    },
    (error, res, body) => {
      //console.log(body.results[0].locations);

      if (error) {
        //   console.log(error);
        const message = "Could not connect to the Geolocation API.";
        return callback(message);
      }
      if (
        body.results[0].locations.length === 0 ||
        !body.results[0].locations[0].street
      ) {
        const invalid = "Invalid Address";
        return callback(invalid);
      }

      const [
        { street, postalCode, adminArea5, adminArea1, latLng }
      ] = body.results[0].locations;

      return callback(null, {
        street,
        postalCode,
        city: adminArea5,
        country: adminArea1,
        ...latLng
      });
    }
  );
};
