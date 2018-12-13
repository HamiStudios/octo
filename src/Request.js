// octo
import OctoRequestBody from './RequestBody';
import OctoRequestParams from './RequestParams';
import OctoRequestQuery from './RequestQuery';
import OctoMethod from './enums/Method';
import OctoProtocol from './enums/Protocol';

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
    return new OctoRequestBody(this.request.body);
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
    return OctoMethod.valueOf(this.request.method);
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
    return new OctoRequestParams(this.request.params);
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
    return OctoProtocol.valueOf(this.request.protocol);
  }

  /**
   * Get the request query
   *
   * @return {OctoRequestQuery} The request query
   */
  getQuery() {
    return new OctoRequestQuery(this.request.query);
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

export default OctoRequest;
