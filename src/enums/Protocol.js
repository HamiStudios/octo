const OctoProtocol = Object.freeze({
  HTTP: 'http',
  HTTPS: 'https',

  // methods
  values: function values() {
    return Object.keys(OctoProtocol)
      .filter(val => typeof OctoProtocol[val] === 'string');
  },
  valueOf: function valueOf(value) {
    const valueUpper = value.toString().toUpperCase();
    const values = OctoProtocol.values();

    return values.indexOf(valueUpper) > -1 ? OctoProtocol[valueUpper] : undefined;
  },
});

export default OctoProtocol;
