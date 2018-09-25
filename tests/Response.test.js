// lib
import OctoResponse from '../src/Response';

// mocks
import expressResponse from './__mocks__/expressResponse.mock';

let response = null;

beforeEach(() => {
  response = new OctoResponse(expressResponse);
});

test('.headersAreSent() should return a boolean', () => {
  expect(typeof response.headersAreSent()).toBe('boolean');
});

test('.headersAreSent() should return whether the headers are sent', () => {
  expect(response.headersAreSent()).toBe(expressResponse.headersSent);
});

test('.addHeader() should add a header to the response', () => {
  response.addHeader('x-test-header', 'added');

  expect(response.response.headers['x-test-header']).toBe('added');
});

test('.getHeader() should return the specified response header', () => {
  response.addHeader('x-test-header', 'added');

  expect(response.getHeader('x-test-header')).toBe('added');
});

test('.attachment() should add the specified file as an attachment', () => {
  response.attachment('/test/file/path');

  expect(response.response.attachments.indexOf('/test/file/path') > -1).toBeTruthy();
});

test('.attachment() should only add the header when no file is specified', () => {
  response.attachment();

  expect(response.response.attachments.indexOf('just header') > -1).toBeTruthy();
});

test('.setCookie() should set the specified cookie on the response', () => {
  response.setCookie('test', 'cool value');

  expect(response.response.cookies.test.value).toBe('cool value');
});

test('.setCookie() should set the specified options on the cookie', () => {
  response.setCookie('test', 'cool value', { testing: true });

  expect(response.response.cookies.test.options.testing).toBeTruthy();
});

test('.clearCookie() should remove the specified cookie from the response', () => {
  response.setCookie('test', 'cool value');
  response.clearCookie('test');

  expect(Object.keys(response.response.cookies)).toHaveLength(0);
});

test('.clearCookie() should remove the specified cookie with the specified options', () => {
  response.setCookie('test', 'cool value', { testing: true });
  response.clearCookie('test', { testing: true });

  expect(Object.keys(response.response.clearedCookies.test.testing)).toBeTruthy();
});

test('.download() should add the specified file as a download', () => {
  response.download('/test/file/path');

  expect(typeof response.response.downloads['/test/file/path']).toBe('object');
});

test('.download() should set the specified filename', () => {
  response.download('/test/file/path', 'test.txt');

  expect(response.response.downloads['/test/file/path'].filename).toBe('test.txt');
});

test('.download() should set the specified options', () => {
  response.download('/test/file/path', 'test.txt', { test: true });

  expect(response.response.downloads['/test/file/path'].options.test).toBeTruthy();
});

test('.download() should run the callback when specified', (done) => {
  response.download('/test/file/path', 'test.txt', null, () => {
    expect(typeof response.response.downloads['/test/file/path']).toBe('object');
    done();
  });
});

test('.json() should set the response body to the JSON specified', () => {
  response.json({
    test: true,
  });

  expect(JSON.parse(response.response.returnValue).test).toBeTruthy();
});

test('.jsonp() should set the response body to the JSON specified', () => {
  response.jsonp({
    test: true,
  });

  expect(JSON.parse(response.response.returnValue).test).toBeTruthy();
});

test('.redirect() should redirect the user on response', () => {
  response.redirect('/test/url');

  expect(response.response.redirectUrl).toBe('/test/url');
});

test('.redirect() should redirect the user on response with the specified status code', () => {
  response.redirect('/test/url', 301);

  expect(response.response.statusCode).toBe(301);
});

test('.render() should set response body to the rendered output of the specified file', () => {
  response.render('index');

  expect(typeof response.response.renders.index).toBe('object');
});

test('.render() should run the callback if specified', (done) => {
  const callback = () => {
    expect(typeof response.response.renders.index).toBe('object');
    done();
  };

  response.render('index', null, callback);
});

test('.send() should set the response body to the specified value', () => {
  response.send('test body');

  expect(response.response.returnValue).toBe('test body');
});

test('.sendFile() should set the response body as the specified file\'s content', () => {
  response.sendFile('/test/file/path');

  expect(response.response.returnValue).toBe('/test/file/path');
});

test('.sendFile() should use the specified options', () => {
  response.sendFile('/test/file/path', { testing: true });

  expect(response.response.sentFiles['/test/file/path'].options.testing).toBeTruthy();
});

test('.status() should set the response status', () => {
  response.status(404);

  expect(response.response.statusCode).toBe(404);
});

test('.type() should set the response type', () => {
  response.type('html');

  expect(response.response.type).toBe('html');
});

test('.getExpressResponse() should return the native express response', () => {
  expect(response.getExpressResponse().express).toBe('response');
});
