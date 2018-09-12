// npm
import dotProp from 'dot-prop';

class OctoRequestBody {
  /**
   * Create a new OctoRequestBody instance
   *
   * @param {Object} body The request body from express
   */
  constructor(body) {
    this.body = body;
  }

  /**
   * Get the raw body object
   *
   * @return {Object} The raw body object from express
   */
  raw() {
    return this.body;
  }

  /**
   * Get a value from the body using dot notation
   *
   * @param {string} path The path to the value in the body using dot notation
   * @param {*} [defaultValue=null] The default value to return if the value doesn't exist
   *                                in the body
   *
   * @return {*} The value from the path in the body or the default value if it doesn't exist
   */
  get(path, defaultValue = null) {
    return dotProp.get(this.body, path, defaultValue);
  }

  /**
   * Check if a value exists in the body using dot notation
   *
   * @param {string} path The path to the value in the body using dot notation
   *
   * @return {boolean} Whether or not the value exists
   */
  exists(path) {
    const value = dotProp.get(this.body, path, undefined);

    return value !== undefined;
  }
}

export default OctoRequestBody;
