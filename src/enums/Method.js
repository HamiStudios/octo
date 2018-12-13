const OctoMethod = Object.freeze({
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  CONNECT: 'CONNECT',
  OPTIONS: 'OPTIONS',
  TRACE: 'TRACE',
  PATCH: 'PATCH',
  ALL: 'ALL',

  // methods
  values: function values() {
    return Object.keys(OctoMethod)
      .filter(val => typeof OctoMethod[val] === 'string');
  },
  valueOf: function valueOf(value) {
    const valueUpper = value.toString().toUpperCase();
    const values = OctoMethod.values();

    return values.indexOf(valueUpper) > -1 ? OctoMethod[valueUpper] : undefined;
  },
});

export default OctoMethod;
