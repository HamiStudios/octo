"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestBody = _interopRequireDefault(require("./RequestBody"));

var _RequestParams = _interopRequireDefault(require("./RequestParams"));

var _RequestQuery = _interopRequireDefault(require("./RequestQuery"));

var _Method = _interopRequireDefault(require("./enums/Method"));

var _Protocol = _interopRequireDefault(require("./enums/Protocol"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// octo
class OctoRequest {
  /**
   * Create a new OctoRequest instance
   *
   * @param {Object} request An express request object
   */
  constructor(request) {
    /**
     * @private
     */
    this.request = request;
  }
  /**
   * Get the request body
   *
   * @return {OctoRequestBody} An OctoRequestBody instance
   */


  getBody() {
    return new _RequestBody.default(this.request.body);
  }
  /**
   * Get the hostname
   *
   * @return {string} The hostname
   */


  getHostname() {
    return this.request.hostname;
  }
  /**
   * Get the requester IP
   *
   * @return {string} The requester IP
   */


  getIP() {
    return this.request.ip;
  }
  /**
   * Get the request method
   *
   * @return {OctoMethod} The request method
   */


  getMethod() {
    return _Method.default.valueOf(this.request.method);
  }
  /**
   * Get the original request URL
   *
   * @return {string} The original request URL
   */


  getOriginalUrl() {
    return this.request.originalUrl;
  }
  /**
   * Get the request params
   *
   * @return {OctoRequestParams} The request params
   */


  getParams() {
    return new _RequestParams.default(this.request.params);
  }
  /**
   * Get the request path
   *
   * @return {string} The request path
   */


  getPath() {
    return this.request.path;
  }
  /**
   * Get the request protocol
   *
   * @return {OctoProtocol} The request protocol
   */


  getProtocol() {
    return _Protocol.default.valueOf(this.request.protocol);
  }
  /**
   * Get the request query
   *
   * @return {OctoRequestQuery} The request query
   */


  getQuery() {
    return new _RequestQuery.default(this.request.query);
  }
  /**
   * Get the request route path
   *
   * @return {string} The request route path
   */


  getRoutePath() {
    return this.request.route.path;
  }
  /**
   * Check whether or not the request was made via a secure connection
   *
   * @return {boolean} Whether or not the request was secure
   */


  isSecure() {
    return this.getProtocol().toString() === 'https';
  }
  /**
   * Get an array of the request subdomains
   *
   * @return {string[]} The request subdomains
   */


  getSubDomains() {
    return this.request.subdomains;
  }
  /**
   * Check whether or not the request was made by XHR (aka ajax)
   *
   * @return {boolean} Whether or not it was a XHR request
   */


  wasXHRRequest() {
    return this.request.xhr;
  }
  /**
   * Get the specified request header
   *
   * @param {string} name The request header name
   *
   * @return {string} The request header value
   */


  getHeader(name) {
    return this.request.get(name);
  }
  /**
   * Get the raw original express request object
   *
   * @return {Object} The express request object
   */


  getExpressRequest() {
    return this.request;
  }

}

var _default = OctoRequest;
exports.default = _default;