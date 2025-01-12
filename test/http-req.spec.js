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
        const prevHeadersAmount = request.headers.asList().length;
        request.setHeader('Content-Type', 'application/xml');
        assert.equal(request.headers.findHeader('content-type').value, 'application/xml');
        assert.equal(request.headers.asList().length, prevHeadersAmount);
    });
});

describe('HttpRequestBuilder building', () => {
    it('should build request with empty body as string', () => {
        const request = new HttpRequest();
        request.setHeader('Content-Type', 'application/json');
        request.startLine.method = 'POST';
        assert.equal(request.asString(), 'POST / HTTP/1.0\r\ncontent-type: application/json\r\n\r\n');
    });
    it('should build request with test body as string', () => {
        const request = new HttpRequest();
        request.setHeader('Content-Type', 'application/json');
        request.startLine.method = 'POST';
        request.body = new JsonBody({ test: 'test' });
        assert.equal(request.asString(), 'POST / HTTP/1.0\r\ncontent-type: application/json\r\n\r\n{"test":"test"}');
    });
});