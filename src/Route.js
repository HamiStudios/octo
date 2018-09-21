class OctoRoute {
  /**
   * Create a new OctoRoute
   *
   * @param {string} path The route path
   * @param {OctoExpressContext} context The route context
   */
  constructor(path, context) {
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
