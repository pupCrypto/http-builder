const Builder = require('../builder');

class ResponseStartLine extends Builder {
    constructor() {
        super();
        this._version = '1.0';
        this._statusCode = 200;
        this._statusText = 'OK';
    }

    get version() {
        return this._version;
    }

    get statusCode() {
        return this._statusCode;
    }

    get statusText() {
        return this._statusText;
    }

    toString() {
        return `HTTP/${this._version} ${this._statusCode} ${this._statusText}\r\n`;
    }
}

class RequestStartLine extends Builder {
    constructor() {
        super();
        this._method = 'GET';
        this._version = '1.0';
    }

    get method() {
        return this._method;
    }
    set method(value) {
        this._method = value;
    }

    get version() {
        return this._version;
    }

    asBuffer() {
        return Buffer.from(this.toString());
    }
    toString() {
        return `${this._method.toUpperCase()} / HTTP/${this._version}\r\n`;
    }
}


module.exports = {
    ResponseStartLine,
    RequestStartLine,
};