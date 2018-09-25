const ExpressResponse = {
  headersSent: false,
  headers: {},
  attachments: [],
  cookies: {},
  clearedCookies: {},
  downloads: {},
  returnValue: null,
  redirectUrl: null,
  sentFiles: {},
  app: {
    defaultRenderData: {},
  },
  renders: {},
  statusCode: 200,
  type: 'text',
  express: 'response',
};

// addHeader
ExpressResponse.append = function addHeader(name, value) {
  ExpressResponse.headers[name] = value;
};

// getHeader
ExpressResponse.get = function getHeader(name) {
  return ExpressResponse.headers[name];
};

// attachment
ExpressResponse.attachment = function addAttachment(filePath = 'just header') {
  ExpressResponse.attachments.push(filePath);
};

// setCookie
ExpressResponse.setCookie = function setCookie(name, value, options) {
  ExpressResponse.cookies[name] = {
    value,
    options,
  };
};

// clearCookie
ExpressResponse.clearCookie = function clearCookie(name, options) {
  delete ExpressResponse.cookies[name];
  ExpressResponse.clearedCookies[name] = options;
};

// download
ExpressResponse.download = function downloadFile(filePath, filename, optionsOrCallback, callback) {
  let options = {};

  if (typeof optionsOrCallback !== 'function') options = optionsOrCallback;

  ExpressResponse.downloads[filePath] = {
    filename,
    options,
    callback,
  };

  if (typeof optionsOrCallback === 'function') optionsOrCallback();
  if (typeof callback === 'function') callback();
};

// json
ExpressResponse.json = function sendJSON(value) {
  ExpressResponse.returnValue = JSON.stringify(value);
};

// jsonp
ExpressResponse.jsonp = function sendJSONP(value) {
  ExpressResponse.returnValue = JSON.stringify(value);
};

// redirect
ExpressResponse.redirect = function redirect(status, urlOrPath) {
  ExpressResponse.redirectUrl = urlOrPath;
  ExpressResponse.statusCode = status;
};

// render
ExpressResponse.render = function render(view, data, callback) {
  ExpressResponse.renders[view] = data;

  if (typeof callback === 'function') callback();
};

// send
ExpressResponse.send = function send(body) {
  ExpressResponse.returnValue = body;
};

// sendFile
ExpressResponse.sendFile = function sendFile(filePath, options, callback) {
  ExpressResponse.returnValue = filePath;

  ExpressResponse.sentFiles[filePath] = {
    options,
    callback,
  };

  if (typeof callback === 'function') callback();
};

// status
ExpressResponse.status = function setStatus(value) {
  ExpressResponse.statusCode = value;
};

// type
ExpressResponse.type = function setType(type) {
  ExpressResponse.type = type;
};

export default ExpressResponse;
