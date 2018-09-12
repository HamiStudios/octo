class OctoRequestQuery {
  /**
   * Create a new OctoRequestQuery instance
   *
   * @param {Object} query The request query from express
   */
  constructor(query) {
    this.query = query;
  }

  /**
   * Get the raw query object
   *
   * @return {Object} The raw query object from express
   */
  raw() {
    return this.query;
  }

  /**
   * Get the specified query value
   *
   * @param {string} key The query key
   * @param {*} [defaultValue=null] The default value to return if the query value doesn't exist
   *
   * @return {*} The query key value or the default value if it doesn't exist
   */
  get(key, defaultValue = null) {
    const value = this.query[key];

    return (value === undefined || value === null) ? defaultValue : value;
  }

  /**
   * Check if a query key exists
   *
   * @param {string} key The query key name
   *
   * @return {boolean} Whether or not the query key exists
   */
  exists(key) {
    const value = this.query[key];

    return value !== undefined;
  }
}

export default OctoRequestQuery;
