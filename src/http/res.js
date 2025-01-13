const { JsonBody, PlainBody } = require('./body');
const { ResponseStartLine } = require('./start-line');
const { Headers } = require('./headers');
const { HttpBuilder } = require('./builder');
const { HTTP_LINE_BREAK } = require('../constants');


class HttpResponse extends HttpBuilder {
    constructor() {
        super();
        this._startLine = new ResponseStartLine();
        this._headers = new Headers();
        this._body = new PlainBody();
    }
    /**
     * 
     * @param {string} name 
     * @param {string} value 
     * @returns 
     */
    setHeader(name, value) {
        return this._headers.setHeader(name, value);
    }

    get headers() {
        return this._headers;
    }

    get startLine() {
        return this._startLine;
    }
    get body() {
        return this._body;
    }
    set body(body) {
        if (typeof body === 'object') {
            if (body instanceof String) {
                body = new PlainBody(body);
            } else if (!body instanceof JsonBody && !body instanceof PlainBody) {
                body = new JsonBody(body);
            }
        } else if (typeof body === 'string') {
            body = new PlainBody(body);
        }

        if (body instanceof PlainBody) {
            this.setHeader('Content-Type', 'text/plain');
        } else if (body instanceof JsonBody) {
            this.setHeader('Content-Type', 'application/json');
        }
        this.setHeader('Content-Length', Buffer.byteLength(body.toString()));
        this._body = body;
    }

    toString() {
        return (
            this.startLine.toString() +
            this.headers.toString() +
            HTTP_LINE_BREAK +
            this.body.toString()
        );
    }
}

module.exports = HttpResponse;
