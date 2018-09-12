class OctoRoute {
  /**
   * Create a new OctoRoute
   *
   * @param {OctoRouteContext} context The route context
   */
  constructor(context) {
    this.context = context;
  }

  /**
   * Get the route path
   *
   * @return {string} The route path
   */
  getPath() {
    return this.context.path;
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
