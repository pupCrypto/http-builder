const assert = require('node:assert');
const { JsonBody } = require('../src/http/body');
const { describe, it } = require('node:test');

describe('JsonBody init', () => {
    it('should return empty string', () => {
        const body = new JsonBody();
        assert.equal(body.toString(), '');
    });
    it('should return json string', () => {
        const body = new JsonBody({ test: 'test' });
        assert.equal(body.toString(), '{"test":"test"}');
    });
});

describe('JsonBody parsing', () => {
    it('should parse json body', () => {
        const stringHttpRequest = (
            'GET / HTTP/1.0\r\n' +
            'Content-Type: application/json\r\n' +
            'Content-Length: 15\r\n' +
            '\r\n' +
            '{ "test": "test" }'
        );
        const body = JsonBody.parseString(stringHttpRequest);
        assert.equal(body.toString(), '{"test":"test"}');
    })
});