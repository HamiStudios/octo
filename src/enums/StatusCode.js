const OctoStatusCode = Object.freeze({
  // Informational response
  Error100: 100,
  Error101: 101,
  Error102: 102,
  Error103: 103,

  // Success
  Error200: 200,
  Error201: 201,
  Error202: 202,
  Error203: 203,
  Error204: 204,
  Error205: 205,
  Error206: 206,
  Error207: 207,
  Error208: 208,
  Error226: 226,

  // Redirection
  Error300: 300,
  Error301: 301,
  Error302: 302,
  Error303: 303,
  Error304: 304,
  Error305: 305,
  Error306: 306,
  Error307: 307,
  Error308: 308,

  // Client errors
  Error400: 400,
  Error401: 401,
  Error402: 402,
  Error403: 403,
  Error404: 404,
  Error405: 405,
  Error406: 406,
  Error407: 407,
  Error408: 408,
  Error409: 409,
  Error410: 410,
  Error411: 411,
  Error412: 412,
  Error413: 413,
  Error414: 414,
  Error415: 415,
  Error416: 416,
  Error417: 417,
  Error418: 418,
  Error421: 421,
  Error422: 422,
  Error423: 423,
  Error424: 424,
  Error426: 426,
  Error428: 428,
  Error429: 429,
  Error431: 431,

  // Server errors
  Error500: 500,
  Error501: 501,
  Error502: 502,
  Error503: 503,
  Error504: 504,
  Error505: 505,
  Error506: 506,
  Error507: 507,
  Error508: 508,
  Error510: 510,
  Error511: 511,

  // methods
  values: function values() {
    return Object.keys(OctoStatusCode)
      .filter(val => typeof OctoStatusCode[val] === 'number');
  },
  valueOf: function valueOf(value) {
    let fullValue = value.toString().toLowerCase();
    fullValue = fullValue.charAt(0).toUpperCase() + fullValue.slice(1);

    if (!fullValue.startsWith('Error')) {
      fullValue = `Error${value.toString()}`;
    }

    const values = OctoStatusCode.values();

    return values.indexOf(fullValue) > -1 ? OctoStatusCode[fullValue] : undefined;
  },
});

export default OctoStatusCode;
