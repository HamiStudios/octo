// lib
import OctoRequest from '../src/Request';
import OctoResponse from '../src/Response';
import OctoExpressContext from '../src/ExpressContext';
import OctoErrorHandler from '../src/ErrorHandler';

let errorHandler = null;
let nextHandlerRan = false;

beforeEach(() => {
  nextHandlerRan = false;
  const nextHandler = function contextNextHandler() {
    nextHandlerRan = true;
  };
  const request = new OctoRequest({ test: true });
  const response = new OctoResponse({ test: true });
  const context = new OctoExpressContext(request, response, nextHandler);

  errorHandler = new OctoErrorHandler('/', context);
});

test('.getPath() should return a string', () => {
  expect(typeof errorHandler.getPath()).toBe('string');
});

test('.getPath() should return the route path', () => {
  expect(errorHandler.getPath()).toBe('/');
});

test('.getRequest() should return the an instance of OctoRequest', () => {
  expect(errorHandler.getRequest()).toBeInstanceOf(OctoRequest);
});

test('.getRequest() should return the OctoRequest instance from the context', () => {
  expect(errorHandler.getRequest().request.test).toBeTruthy();
});

test('.getResponse() should return the an instance of OctoResponse', () => {
  expect(errorHandler.getResponse()).toBeInstanceOf(OctoResponse);
});

test('.getResponse() should return the OctoResponse instance from the context', () => {
  expect(errorHandler.getResponse().response.test).toBeTruthy();
});

test('.nextHandler() should run the nextHandler function from the context', () => {
  errorHandler.nextHandler();

  expect(nextHandlerRan).toBeTruthy();
});
