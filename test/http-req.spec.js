const assert = require('node:assert');
const { describe, it } = require('node:test');
const { JsonBody } = require('../src/http/body');
const HttpRequest = require('../src/http/req');

describe('HttpRequestBuilder start line', () => {
    it('should return 1.0 http version', () => {
        const request = new HttpRequest();
        assert.equal(request.startLine.version, '1.0');
    });
    it('should return default GET method', () => {
        const request = new HttpRequest();
        assert.equal(request.startLine.method, 'GET');
    });
    it('should set new http method', () => {
        const request = new HttpRequest();
        request.startLine.method = 'POST';
        assert.equal(request.startLine.method, 'POST');
    });
});

describe('HttpRequestBuilder header', () => {
    it('should add new header', () => {
        const request = new HttpRequest();
        request.setHeader('Content-Type', 'application/json');
        assert.equal(request.headers.findHeader('content-type').value, 'application/json');
    });
    it('should update existing header', () => {
        const request = new HttpRequest();
        request.setHeader('Content-Type', 'application/json');
        const prevHeadersAmount = request.headers.toList().length;
        request.setHeader('Content-Type', 'application/xml');
        assert.equal(request.headers.findHeader('content-type').value, 'application/xml');
        assert.equal(request.headers.toList().length, prevHeadersAmount);
    });
});

describe('HttpRequestBuilder building', () => {
    it('should build request with empty body as string', () => {
        const request = new HttpRequest();
        request.setHeader('Content-Type', 'application/json');
        request.startLine.method = 'POST';
        assert.equal(request.toString(), 'POST / HTTP/1.0\r\ncontent-type: application/json\r\n\r\n');
    });
    it('should build request with test body as string', () => {
        const request = new HttpRequest();
        request.setHeader('Content-Type', 'application/json');
        request.startLine.method = 'POST';
        request.body = new JsonBody({ test: 'test' });
        assert.equal(request.toString(), 'POST / HTTP/1.0\r\ncontent-type: application/json\r\ncontent-length: 15\r\n\r\n{"test":"test"}');
    });
});

describe('HttpRequestBuilder parsing', () => {
    it('should parse the whole request', () => {
        const stringHttpRequest = (
            'GET / HTTP/1.0\r\n' +
            'Content-Type: application/json\r\n' +
            'Content-Length: 15\r\n' +
            '\r\n' +
            'Hello world'
        );
        const request = HttpRequest.parseString(stringHttpRequest);
        assert.equal(request.body.toString(), 'Hello world');
        assert.equal(request.headers.findHeader('content-type').value, 'application/json');
        assert.equal(request.headers.findHeader('content-length').value, '15');
        assert.equal(request.startLine.method, 'GET');
        assert.equal(request.startLine.uri, '/');
        assert.equal(request.startLine.version, '1.0');
    });
});