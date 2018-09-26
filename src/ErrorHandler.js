// libs
import OctoExpressContext from './ExpressContext';

class OctoErrorHandler {
  /**
   * Create a new OctoRoute
   *
   * @param {string|OctoExpressContext} pathOrContext The path to use or express context
   * @param {OctoExpressContext} [context=null] The express context
   */
  constructor(pathOrContext, context = null) {
    if (typeof pathOrContext === 'string') {
      this.path = pathOrContext;
    } else {
      this.context = pathOrContext;
    }

    if (context !== null && context instanceof OctoExpressContext) {
      this.context = context;
    }
  }

  /**
   * Get the error handler path
   *
   * @return {string} The error handler path
   */
  getPath() {
    return this.path;
  }

  /**
   * Get the request instance
   *
   * @return {OctoRequest}
   */
  getRequest() {
    return this.context.request;
  }

  /**
   * Get the response instance
   *
   * @return {OctoResponse}
   */
  getResponse() {
    return this.context.response;
  }

  /**
   * Continue to the next handler
   */
  nextHandler() {
    this.context.nextHandlerCallback();
  }
}

export default OctoErrorHandler;
