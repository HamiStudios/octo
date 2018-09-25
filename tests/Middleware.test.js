// lib
import OctoRequest from '../src/Request';
import OctoResponse from '../src/Response';
import OctoExpressContext from '../src/ExpressContext';
import OctoMiddleware from '../src/Middleware';

let middleware = null;
let nextHandlerRan = false;

beforeEach(() => {
  nextHandlerRan = false;
  const nextHandler = function contextNextHandler() {
    nextHandlerRan = true;
  };
  const request = new OctoRequest({ test: true });
  const response = new OctoResponse({ test: true });
  const context = new OctoExpressContext(request, response, nextHandler);

  middleware = new OctoMiddleware(context);
});

test('.getRequest() should return the an instance of OctoRequest', () => {
  expect(middleware.getRequest()).toBeInstanceOf(OctoRequest);
});

test('.getRequest() should return the OctoRequest instance from the context', () => {
  expect(middleware.getRequest().request.test).toBeTruthy();
});

test('.getResponse() should return the an instance of OctoResponse', () => {
  expect(middleware.getResponse()).toBeInstanceOf(OctoResponse);
});

test('.getResponse() should return the OctoResponse instance from the context', () => {
  expect(middleware.getResponse().response.test).toBeTruthy();
});

test('.nextHandler() should run the nextHandler function from the context', () => {
  middleware.nextHandler();

  expect(nextHandlerRan).toBeTruthy();
});
