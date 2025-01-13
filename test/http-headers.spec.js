const assert = require('node:assert');
const { Headers } = require('../src/http/headers');
const { describe, it } = require('node:test');

describe('Headers parsing', () => {
    it('should parse headers from string', () => {
        const headers = Headers.parseString(
            'GET / HTTP/1.0\r\n' +
            'Content-Type: application/json\r\n' +
            'Content-Length: 15\r\n' +
            '\r\n' +
            '{ "test": "test" }'
        )
        assert.equal(headers.findHeader('content-type').value, 'application/json');
        assert.equal(headers.findHeader('content-length').value, '15');
        assert.equal(headers.toList().length, 2);
    });
});