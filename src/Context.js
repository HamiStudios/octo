// octo
import OctoRequest from './Request';
import OctoResponse from './Response';

class OctoContext {
  /**
   * Create a new OctoContext which holds the express request
   * and response instances
   *
   * @param {Object} request An express request instance
   * @param {Object} response An express response instance
   * @param {function} next A express next function
   * @param {string} pathHook The path which caught the request and caused the handler to be ran
   */
  constructor(request, response, next, pathHook) {
    this.express = {
      request,
      response,
      next,
    };

    this.octo = {
      request: new OctoRequest(request),
      response: new OctoResponse(response),
    };

    this.pathHook = pathHook;

    this.movingToNext = false;
  }

  /**
   * Get the OctoRequest instance
   *
   * @return {OctoRequest}
   */
  getRequest() {
    return this.octo.request;
  }

  /**
   * Get the raw express request object
   *
   * @return {Object}
   */
  getRawRequest() {
    return this.express.request;
  }

  /**
   * Get the OctoResponse instance
   *
   * @return {OctoResponse}
   */
  getResponse() {
    return this.octo.response;
  }

  /**
   * Get the raw express response object
   *
   * @return {Object}
   */
  getRawResponse() {
    return this.express.response;
  }

  /**
   * Get the path which caught the request and caused the handler to be ran
   *
   * @return {string} The path hook
   */
  getPathHook() {
    return this.pathHook;
  }

  /**
   * Get the next handler function
   *
   * @return {Function}
   */
  getNextHandler() {
    return () => {
      this.movingToNext = true;
      this.express.next();
    };
  }

  /**
   * Check if the current handler is moving the request
   * onto the next handler
   *
   * @return {boolean} Whether the request is getting passed on
   */
  isMovingToNext() {
    return this.movingToNext;
  }
}

export default OctoContext;
