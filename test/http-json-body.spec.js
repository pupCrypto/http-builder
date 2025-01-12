const assert = require('node:assert');
const { JsonBody } = require('../src/http/body');
const { describe, it } = require('node:test');

describe('JsonBody', () => {
    it('should return empty string', () => {
        const body = new JsonBody();
        assert.equal(body.toString(), '');
    });
    it('should return json string', () => {
        const body = new JsonBody({ test: 'test' });
        assert.equal(body.toString(), '{"test":"test"}');
    });
});