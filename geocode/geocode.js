const axios = require("axios");

module.exports.geocodeAddress = address => {
  const encodedAddress = encodeURIComponent(address);
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${
    process.env.GEOLOCATION_KEY
  }&location=${encodedAddress}`;

  return axios.get(url).then(res => {
    const {
      street,
      postalCode,
      adminArea5,
      adminArea1,
      latLng
    } = res.data.results[0].locations[0];
    return {
      street,
      postalCode,
      city: adminArea5,
      country: adminArea1,
      ...latLng
    };
  });
};
