const { RequestStartLine } = require('./start-line');
const { Headers } = require('./headers');
const { PlainBody } = require('./body');
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
        // check type
        this._body = body;
    }

    asString() {
        return (
            this.startLine.asString() +
            this.headers.asString() +
            HTTP_LINE_BREAK +
            this.body.asString()
        );
    }

}

module.exports = HttpRequest;
