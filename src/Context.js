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
   */
  constructor(request, response, next) {
    this.express = {
      request,
      response,
      next,
    };

    this.octo = {
      request: new OctoRequest(request),
      response: new OctoResponse(response),
    };

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
