const { RequestStartLine } = require('./start-line');
const { Headers } = require('./headers');
const { JsonBody, PlainBody } = require('./body');
const Builder = require('../builder');
const { HTTP_LINE_BREAK } = require('../constants');


class HttpRequest extends Builder {
    constructor() {
        super();
        this._startLine = new RequestStartLine();
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
        if (typeof body === 'string' || (typeof body == 'object' && body instanceof String)) {
            body = new PlainBody(body);
        } else {
            body = new JsonBody(body);
        }
        if (body instanceof PlainBody) {
            this.setHeader('Content-Type', 'text/plain');
        } else if (body instanceof JsonBody) {
            this.setHeader('Content-Type', 'application/json');
        }
        this.setHeader('Content-Length', body.toString().length);
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

module.exports = HttpRequest;
