const assert = require('node:assert');
const { describe, it } = require('node:test');
const { JsonBody } = require('../src/http/body');
const HttpResponse = require('../src/http/res');

describe('HttpResponseBuilder start line', () => {
    it('should return 1.0 http version', () => {
        const response = new HttpResponse();
        assert.equal(response.startLine.version, '1.0');
    });
    it('should return default status code 200', () => {
        const response = new HttpResponse();
        assert.equal(response.startLine.statusCode, 200);
    });
    it('should return default status text', () => {
        const response = new HttpResponse();
        assert.equal(response.startLine.statusText, 'OK');
    });
});

describe('HttpResponseBuilder building', () => {
    it('should build response with empty body as string', () => {
        const response = new HttpResponse();
        assert.equal(response.asString(), 'HTTP/1.0 200 OK\r\n\r\n');
    });
    it('should build response with test body as string', () => {
        const response = new HttpResponse();
        response.body = new JsonBody({ test: 'test' });
        assert.equal(response.asString(), 'HTTP/1.0 200 OK\r\n\r\n{"test":"test"}');
    });
});