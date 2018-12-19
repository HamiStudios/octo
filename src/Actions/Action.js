class OctoAction {
  /**
   * Create a new OctoAction instance
   *
   * @param {OctoContext} context The request context
   */
  constructor(context) {
    this.ctx = context;

    this.getRequest = this.getRequest.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
    this.getContext = this.getContext.bind(this);
  }

  /**
   * Get the OctoRequest instance
   *
   * @return {OctoRequest}
   */
  getRequest() {
    return this.ctx.getRequest();
  }

  /**
   * Get the OctoResponse instance
   *
   * @return {OctoResponse}
   */
  getResponse() {
    return this.ctx.getResponse();
  }

  /**
   * Continue to the next function
   *
   * @return {Function}
   */
  nextHandler() {
    this.ctx.getNextHandler()();
  }

  /**
   * Get the path which caught the request and caused the handler to be ran
   *
   * @return {string} The path hook
   */
  getPathHook() {
    return this.ctx.getPathHook();
  }

  /**
   * Get the raw context
   *
   * @return {OctoContext}
   */
  getContext() {
    return this.ctx;
  }
}

export default OctoAction;
