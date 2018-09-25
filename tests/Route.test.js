// lib
import OctoRequest from '../src/Request';
import OctoResponse from '../src/Response';
import OctoExpressContext from '../src/ExpressContext';
import OctoRoute from '../src/Route';

let route = null;
let nextHandlerRan = false;

beforeEach(() => {
  nextHandlerRan = false;
  const nextHandler = function contextNextHandler() {
    nextHandlerRan = true;
  };
  const request = new OctoRequest({ test: true });
  const response = new OctoResponse({ test: true });
  const context = new OctoExpressContext(request, response, nextHandler);

  route = new OctoRoute('/', context);
});

test('.getPath() should return a string', () => {
  expect(typeof route.getPath()).toBe('string');
});

test('.getPath() should return the route path', () => {
  expect(route.getPath()).toBe('/');
});

test('.getRequest() should return the an instance of OctoRequest', () => {
  expect(route.getRequest()).toBeInstanceOf(OctoRequest);
});

test('.getRequest() should return the OctoRequest instance from the context', () => {
  expect(route.getRequest().request.test).toBeTruthy();
});

test('.getResponse() should return the an instance of OctoResponse', () => {
  expect(route.getResponse()).toBeInstanceOf(OctoResponse);
});

test('.getResponse() should return the OctoResponse instance from the context', () => {
  expect(route.getResponse().response.test).toBeTruthy();
});

test('.nextHandler() should run the nextHandler function from the context', () => {
  route.nextHandler();

  expect(nextHandlerRan).toBeTruthy();
});
