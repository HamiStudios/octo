"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasProp = hasProp;
exports.hasFunction = hasFunction;

/**
 * Check if the instance prop is of the specified type
 *
 * @param {Route|Operation|ErrorHandler} instance The instance to check
 * @param {string} name The prop name
 * @param {string} type The type to match
 * @param {boolean} canBeArray Whether it can be an array
 * @param {boolean} required Whether the value is required
 *
 * @return {boolean} Whether or not it is the type
 */
function hasProp(instance, name, type, canBeArray = false, required = false) {
  const val = instance[name];
  const exists = val !== undefined && val !== null;
  if (required && !exists) return false;

  if (exists) {
    const matches = typeof val === type; // eslint-disable-line

    if (!canBeArray && Array.isArray(val)) {
      return false;
    }

    if (canBeArray && Array.isArray(val)) {
      return true;
    }

    return matches;
  }

  return true;
}
/**
 * Check if instance has the specified function
 *
 * @param {Route|Operation|ErrorHandler} instance The instance to check
 * @param {string} name The name of the function
 * @param {boolean} required Whether it is required
 *
 * @return {boolean} Whether the instance has the function
 */


function hasFunction(instance, name, required = false) {
  const val = instance[name];
  const exists = val !== undefined && val !== null;
  if (required && !exists) return false;

  if (exists) {
    if (typeof val !== 'function') return false;
  }

  return true;
}