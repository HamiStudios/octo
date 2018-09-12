class OctoRequestParams {
  /**
   * Create a new OctoRequestParams instance
   *
   * @param {Object} params The request params from express
   */
  constructor(params) {
    this.params = params;
  }

  /**
   * Get the raw params object
   *
   * @return {Object} The raw params object from express
   */
  raw() {
    return this.params;
  }

  /**
   * Get the specified param value
   *
   * @param {string} key The param name
   * @param {*} [defaultValue=null] The default value to return if the param doesn't exist
   *
   * @return {*} The param value or the default value if it doesn't exist
   */
  get(key, defaultValue = null) {
    const value = this.params[key];

    return (value === undefined || value === null) ? defaultValue : value;
  }

  /**
   * Check if a param exists
   *
   * @param {string} key The param name
   *
   * @return {boolean} Whether or not the param exists
   */
  exists(key) {
    const value = this.params[key];

    return value !== undefined;
  }
}

export default OctoRequestParams;
