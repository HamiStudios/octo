// lib
import OctoRequest from '../src/Request';
import OctoRequestBody from '../src/RequestBody';
import OctoRequestParams from '../src/RequestParams';
import OctoRequestQuery from '../src/RequestQuery';

// mocks
import expressRequest from './__mocks__/expressRequest.mock';

let request = null;

beforeEach(() => {
  request = new OctoRequest(expressRequest);
});

test('.getBody() should return a OctoRequestBody instance', () => {
  expect(request.getBody()).toBeInstanceOf(OctoRequestBody);
});

test('.getHostname() should return a string', () => {
  expect(typeof request.getHostname()).toBe('string');
});

test('.getHostname() should be the request hostname', () => {
  expect(request.getHostname()).toBe(expressRequest.hostname);
});

test('.getIP() should return a string', () => {
  expect(typeof request.getIP()).toBe('string');
});

test('.getIP() should be the requester IP address', () => {
  expect(request.getIP()).toBe(expressRequest.ip);
});

test('.getMethod() should return a string', () => {
  expect(typeof request.getMethod()).toBe('string');
});

test('.getMethod() should be the request method', () => {
  expect(request.getMethod()).toBe(expressRequest.method);
});

test('.getOriginalUrl() should return a string', () => {
  expect(typeof request.getOriginalUrl()).toBe('string');
});

test('.getOriginalUrl() should be the request url', () => {
  expect(request.getOriginalUrl()).toBe(expressRequest.originalUrl);
});

test('.getParams() should return an OctoRequestParams instance', () => {
  expect(request.getParams()).toBeInstanceOf(OctoRequestParams);
});

test('.getPath() should return a string', () => {
  expect(typeof request.getPath()).toBe('string');
});

test('.getPath() should be the request path', () => {
  expect(request.getPath()).toBe(expressRequest.path);
});

test('.getProtocol() should return a string', () => {
  expect(typeof request.getProtocol()).toBe('string');
});

test('.getProtocol() should be the request method', () => {
  expect(request.getProtocol()).toBe(expressRequest.protocol);
});

test('.getQuery() should return am OctoRequestQuery instance', () => {
  expect(request.getQuery()).toBeInstanceOf(OctoRequestQuery);
});

test('.getRoutePath() should return a string', () => {
  expect(typeof request.getRoutePath()).toBe('string');
});

test('.getRoutePath() should be the request method', () => {
  expect(request.getRoutePath()).toBe(expressRequest.route.path);
});

test('.isSecure() should return a boolean', () => {
  expect(typeof request.isSecure()).toBe('boolean');
});

test('.isSecure() should return whether the request was made via https', () => {
  expect(request.isSecure()).toBe(request.protocol === 'https');
});

test('.getSubDomains() should return an array', () => {
  expect(Array.isArray(request.getSubDomains())).toBeTruthy();
});

test('.getSubDomains() should be the request subdomains', () => {
  expect(request.getSubDomains()).toHaveLength(expressRequest.subdomains.length);
});

test('.wasXHRRequest() should return a boolean', () => {
  expect(typeof request.wasXHRRequest()).toBe('boolean');
});

test('.wasXHRRequest() should return whether or not the request was made by XHR', () => {
  expect(request.wasXHRRequest()).toBe(expressRequest.xhr);
});

test('.getHeader() should return a string', () => {
  expect(typeof request.getHeader('x-test-header')).toBe('string');
});

test('.getHeader() should be the specified request header', () => {
  expect(request.getHeader('x-test-header')).toBe(expressRequest.headers['x-test-header']);
});

test('.getExpressRequest() should be a object', () => {
  expect(typeof request.getExpressRequest()).toBe('object');
});

test('.getExpressRequest() should return the raw express request', () => {
  expect(request.getExpressRequest().express).toBe('request');
});
