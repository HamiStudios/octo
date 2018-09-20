// libs
import OctoExpressContext from './ExpressContext';

class OctoRoute extends OctoExpressContext {
  /**
   * Create a new OctoRoute
   *
   * @param {string} path The route path
   * @param {OctoExpressContext} context The route context
   */
  constructor(path, context) {
    super(
      context.request,
      context.response,
      context.nextHandlerCallback,
    );

    this.path = path;
    this.context = context;
  }

  /**
   * Get the route path
   *
   * @return {string} The route path
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

export default OctoRoute;
