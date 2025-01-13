const assert = require('node:assert');
const { describe, it } = require('node:test');
const { RequestStartLine } = require('../src/http/start-line');

describe('RequestStartLine', () => {
    it('parse start line', () => {
        const stringHttpRequest = (
            'GET / HTTP/1.0\r\n' +
            'Content-Type: application/json\r\n' +
            'Content-Length: 15\r\n' +
            '\r\n' +
            '{ "test": "test" }'
        );
        const startLine = RequestStartLine.parseString(stringHttpRequest);
        assert.equal(startLine.method, 'GET');
        assert.equal(startLine.uri, '/');
        assert.equal(startLine.version, '1.0');
    });
});