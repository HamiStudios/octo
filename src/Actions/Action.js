class Action {
  /**
   * Create a new OctoAction instance
   *
   * @param {Context} context The request context
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
   * @return {Request}
   */
  getRequest() {
    return this.ctx.getRequest();
  }

  /**
   * Get the OctoResponse instance
   *
   * @return {Response}
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
   * Get the raw context
   *
   * @return {Context}
   */
  getContext() {
    return this.ctx;
  }
}

export default Action;
