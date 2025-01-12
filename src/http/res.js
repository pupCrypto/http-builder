const { PlainBody } = require('./body');
const { ResponseStartLine } = require('./start-line');
const Builder = require('../builder');


class HttpResponse extends Builder {
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

module.exports = HttpResponse;
