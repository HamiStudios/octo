// lib
import OctoMethod from '../enums/Method';

class Validator {
  static hasRequestMethod(route) {
    // get all the functions
    const functions = Object.getOwnPropertyNames(route.prototype);

    // get an array of all method names in lowercase
    const methods = OctoMethod.values().map(method => method.toLowerCase());

    // get an array of all the methods the route has a function for
    const contains = methods.filter(method => functions.indexOf(method) > -1);

    // if the route contains 1 or more functions it has can be used
    return contains.length > 0;
  }

  static hasMiddlewareMethod(middleware) {
    // get all the functions
    const functions = Object.getOwnPropertyNames(middleware.prototype);

    // if functions contains `use` the middleware can be used
    return functions.indexOf('use');
  }
}

export default Validator;
