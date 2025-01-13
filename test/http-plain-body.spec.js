const assert = require('node:assert');
const { PlainBody } = require('../src/http/body');
const { describe, it } = require('node:test');


describe('PlainBody parsing', () => {
    it('should parse json body', () => {
        const stringHttpRequest = (
            'GET / HTTP/1.0\r\n' +
            'Content-Type: application/json\r\n' +
            'Content-Length: 15\r\n' +
            '\r\n' +
            'Hello world'
        );
        const body = PlainBody.parseString(stringHttpRequest);
        assert.equal(body.toString(), 'Hello world');
    })
});