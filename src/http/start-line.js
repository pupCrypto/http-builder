const { HttpBuilder } = require('./builder');

class ResponseStartLine extends HttpBuilder {
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

class RequestStartLine extends HttpBuilder {
    constructor(method='GET', uri='/', version='1.0') {
        super();
        this._method = method;
        this._uri = uri;
        this._version = version;
        this._url = new URL('http://localhost' + uri);  // only for query params
    }

    get method() {
        return this._method;
    }
    set method(value) {
        this._method = value;
    }

    get uri() {
        return this._uri;
    }

    get version() {
        return this._version;
    }

    get query() {
        return this._url.searchParams;
    }

    get path() {
        return this._url.pathname;
    }

    asBuffer() {
        return Buffer.from(this.toString());
    }
    toString() {
        return `${this._method.toUpperCase()} / HTTP/${this._version}\r\n`;
    }
    static parseString(data) {
        const [method, uri] = data.split(' ');
        const version = data.match(/HTTP\/(\d\.\d)/).at(0).replace('HTTP/', '');
        return new RequestStartLine(method, uri, version);
    }
}


module.exports = {
    ResponseStartLine,
    RequestStartLine,
};