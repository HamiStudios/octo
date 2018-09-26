// npm
import path from 'path';
import assign from 'circle-assign';

class OctoResponse {
  /**
   * Create a new OctoResponse instance
   *
   * @param response
   */
  constructor(response) {
    this.response = response;
  }

  /**
   * Check whether or not the response headers are sent
   *
   * @return {boolean} Whether or not the response headers are sent
   */
  headersAreSent() {
    return this.response.headersSent;
  }

  /**
   * Add a header to the response
   *
   * @param {string} name The header name
   * @param {string} value The header value
   *
   * @return {OctoResponse}
   */
  addHeader(name, value) {
    this.response.append(name, value);

    return this;
  }

  /**
   * Get the specified response header value
   *
   * @param {string} name The header name
   *
   * @return {string} The header value
   */
  getHeader(name) {
    return this.response.get(name);
  }

  /**
   * Add an attachment to the response
   *
   * @param {string} [filePath] The path to the file to attach
   *
   * @return {OctoResponse}
   */
  attachment(filePath = '') {
    if (filePath === '') this.response.attachment();
    else this.response.attachment(filePath);

    return this;
  }

  /**
   * Set a cookie with the specified value and options
   *
   * @param {string} name The cookie name
   * @param {string} value The cookie value
   * @param {Object} [options={}] The options
   *
   * @return {OctoResponse}
   */
  setCookie(name, value, options = {}) {
    this.response.setCookie(name, value, options);

    return this;
  }

  /**
   * Clear a cookie value
   *
   * @param {string} name The cookie name
   * @param {Object} [options={}] The cookie options
   *
   * @return {OctoResponse}
   */
  clearCookie(name, options = {}) {
    this.response.clearCookie(name, options);

    return this;
  }

  /**
   * Send a file for download
   *
   * @param {string} filePath The path to the file to download
   * @param {string} [filename=file name] The name of the file they download
   * @param {Object|Function} [optionsOrCallback={}] The download options or a callback
   * @param {function(err: Error)} callback Callback with error if the file errors
   *
   * @return {OctoResponse}
   */
  download(filePath, filename = '', optionsOrCallback = {}, callback = () => {}) {
    let downloadName = filename;
    if (downloadName === '') downloadName = path.basename(filePath);

    this.response.download(filePath, downloadName, optionsOrCallback, callback);

    return this;
  }

  /**
   * Send JSON as the response body
   *
   * @param {Object|Array} value The object or array to send as JSON
   *
   * @return {OctoResponse}
   */
  json(value) {
    this.response.json(value);

    return this;
  }

  /**
   * Send JSON as the response body in jsonp form
   *
   * @param {Object|Array} value The object or array to send as JSON
   *
   * @return {OctoResponse}
   */
  jsonp(value) {
    this.response.jsonp(value);

    return this;
  }

  /**
   * Redirect the client to the specified location
   *
   * @param {string} urlOrPath The URL or path to redirect to
   * @param {number} [status] The status code to send
   *
   * @return {OctoResponse}
   */
  redirect(urlOrPath, status = 302) {
    this.response.redirect(status, urlOrPath);

    return this;
  }

  /**
   * Render the specified view
   *
   * @param {string} view The view name
   * @param {Object} [data={}] The data to pass to the view
   * @param {function(err: Error, html: string)} [callback] A callback which contains an error if
   *                                                        one and the HTML which can be used as
   *                                                        the response body
   *
   * @return {OctoResponse}
   */
  render(view, data = {}, callback = undefined) {
    // assign (override) the data to the default data
    const locals = assign(this.response.app.defaultRenderData, data);

    if (callback === undefined) this.response.render(view, locals);
    else this.response.render(view, locals, callback);

    return this;
  }

  /**
   * Send the specified content as the response body
   *
   * @param {string|Object|Array} body The content to send as the response body
   *
   * @return {OctoResponse}
   */
  send(body) {
    this.response.send(body);

    return this;
  }

  /**
   * Send a files content as the response body
   *
   * @param {string} filePath The path to the file to send
   * @param {Object} [options] The options
   * @param {function(err: Error)} [callback] The callback containing an error if there is one
   *
   * @return {OctoResponse}
   */
  sendFile(filePath, options = {}, callback = () => {}) {
    this.response.sendFile(filePath, options, callback);

    return this;
  }

  /**
   * Set the response status code
   *
   * @param {number} value The status code
   *
   * @return {OctoResponse}
   */
  status(value) {
    this.response.status(value);

    return this;
  }

  /**
   * Get the current response status code
   *
   * @return {number}
   */
  getStatus() {
    return this.response.statusCode;
  }

  /**
   * Set the response type
   *
   * @param {string} type The type
   *
   * @return {OctoResponse}
   */
  type(type) {
    this.response.type(type);

    return this;
  }

  /**
   * Get the raw original express response object
   *
   * @return {Object} The express response object
   */
  getExpressResponse() {
    return this.response;
  }
}

export default OctoResponse;
