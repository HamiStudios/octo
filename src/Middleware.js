// libs
import OctoExpressContext from './ExpressContext';

class OctoMiddleware extends OctoExpressContext {
  /**
   * Create a new OctoMiddleware
   *
   * @param {OctoExpressContext} context The route context
   */
  constructor(context) {
    super(
      context.request,
      context.response,
      context.nextHandlerCallback,
    );

    this.context = context;
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

export default OctoMiddleware;
